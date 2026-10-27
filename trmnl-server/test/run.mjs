// Local check of the whole server with a pretend TRMNL.
// Network calls are answered from the plugins' test fixtures, and the Cloudflare
// browser is stood in for by a local Chromium, so this runs with no accounts.
//
//   node build.mjs && node test/run.mjs
// Needs playwright-core and a Chromium (CHROMIUM_PATH), and the trmnl-framework
// public/ folder served at FRAMEWORK_HOST so the pages get their real styles.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { build } from 'esbuild';

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.OUT_DIR || join(here, 'out');
mkdirSync(out, { recursive: true });

// Bundle the source the same way build.mjs does, plus a few internals to check.
const bundle = join(out, 'worker-under-test.mjs');
await build({
  stdin: {
    contents: "export { default } from './src/worker.js'; export { chooseScreen, needsRainCheck } from './src/choose.js'; export { utcOffset } from './src/screens.js';",
    resolveDir: join(here, '..'),
  },
  outfile: bundle, bundle: true, format: 'esm', platform: 'browser', target: 'es2022',
  loader: { '.png': 'binary' }, logLevel: 'warning',
});
const { default: worker, chooseScreen, needsRainCheck, utcOffset } = await import(bundle);
const fixture = (p) => JSON.parse(readFileSync(join(here, '..', p), 'utf8'));

// Bus times moved so the first bus is two minutes away, as if fetched just now.
const arrivals = fixture('../trmnl-transport/tests/fixtures/tfl-arrivals.json');
const first = Math.min(...arrivals.map((a) => Date.parse(a.expectedArrival)));
const shift = Date.now() + 120_000 - first;
for (const a of arrivals) a.expectedArrival = new Date(Date.parse(a.expectedArrival) + shift).toISOString();

let browserFails = false;
let raining = false; // what the rain check sees
const tiles = join(here, '../../trmnl-radar/tests/fixtures/tiles');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const calls = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (input, init = {}) => {
  const url = String(input);
  calls.push(url);
  const reply = (body) => new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json' } });
  let m;
  if ((m = url.match(/api\.tfl\.gov\.uk\/StopPoint\/(\w+)\/Arrivals/))) return reply(arrivals.filter((a) => a.naptanId === m[1]));
  if (url.includes('GetDepartureBoard/DMK')) {
    assert.equal(init.headers['x-apikey'], 'test-rail-key');
    return reply(fixture('../trmnl-transport/tests/fixtures/rail-denmark-hill.json'));
  }
  if (url.includes('GetDepartureBoard/EDW')) return reply(fixture('../trmnl-transport/tests/fixtures/rail-east-dulwich.json'));
  if (url.includes('api.rainviewer.com')) return reply(fixture('../trmnl-radar/tests/fixtures/rainviewer-maps.json'));
  if (url.includes('api.open-meteo.com') && url.includes('minutely_15')) {
    return reply({ current: { precipitation: 0 }, minutely_15: { precipitation: raining ? [0, 0, 0.3, 0.8, 1, 1, 0.5, 0.2] : [0, 0, 0, 0, 0, 0, 0, 0] },
      hourly: { precipitation_probability: raining ? [40, 80] : [5, 10] } });
  }
  if (url.includes('api.open-meteo.com') && url.includes('forecast_hours=36')) return reply(fixture('../trmnl-forecast/tests/fixtures/open-meteo.json'));
  if (url.includes('api.open-meteo.com') && url.includes('forecast_hours=12')) return reply(fixture('../trmnl-radar/tests/fixtures/open-meteo.json'));
  if (url.includes('api.open-meteo.com')) return reply(fixture('../trmnl-weather/tests/fixtures/open-meteo.json'));
  if (url.includes('/browser-rendering/screenshot')) {
    if (browserFails) return new Response('limit reached', { status: 429 });
    const opts = JSON.parse(init.body);
    const page = await browser.newPage({ viewport: opts.viewport });
    // Radar tiles are fetched by the browser; answer them with the made-up test tiles.
    await page.route('https://tilecache.rainviewer.com/**', (route) => {
      const m = route.request().url().match(/\/256\/(\d+)\/(\d+)\/(\d+)\//);
      try {
        route.fulfill({ body: readFileSync(join(route.request().url().includes('/1792601400/') ? `${tiles}-old` : tiles, `${m[1]}-${m[2]}-${m[3]}.png`)), contentType: 'image/png',
          headers: { 'access-control-allow-origin': '*' } });
      } catch { route.fulfill({ status: 404, headers: { 'access-control-allow-origin': '*' } }); }
    });
    await page.setContent(opts.html, { waitUntil: 'networkidle' });
    const png = await page.screenshot({ type: 'png' });
    await page.close();
    return new Response(png, { headers: { 'content-type': 'image/png' } });
  }
  return realFetch(input, init);
};

const env = {
  FORECAST_HOURS: 'off', // so the wake tests don't depend on the time of day
  SECRET: 'test-secret-123456',
  RAIL_KEY: 'test-rail-key',
  TFL_KEY: 'test-tfl-key',
  CF_ACCOUNT_ID: 'acct',
  CF_API_TOKEN: 'token',
  FRAMEWORK_HOST: process.env.FRAMEWORK_HOST || 'https://trmnl.com',
};
const base = 'https://trmnl.example.workers.dev/test-secret-123456';
const get = (path, headers = {}) => worker.fetch(new Request(base + path, { headers }), env);

// The choice of screen
// Noon and 7am in London, so the tests don't depend on when they run.
const NOON = new Date('2026-10-26T12:00:00Z'), SEVEN = new Date('2026-10-26T07:00:00Z');
const choose = (source, current, env, rain = false, now = NOON) => chooseScreen(source, current, env, rain, now);
assert.deepEqual(choose('timer', '1200', {}), { screen: 'weather', refresh: 1200 });
assert.deepEqual(choose('button', '1200', {}), { screen: 'transport', refresh: 121 });
assert.deepEqual(choose('button', '121', {}), { screen: 'radar', refresh: 902 }); // press again: radar
assert.deepEqual(choose('button', '902', {}), { screen: 'forecast', refresh: 904 }); // and again: written forecast
assert.deepEqual(choose('button', '904', {}), { screen: 'weather', refresh: 1200 }); // and again: weather
assert.deepEqual(choose('timer', '904', {}), { screen: 'weather', refresh: 1200 }); // forecast time's up
assert.deepEqual(choose('button', '121', { RADAR: 'off' }), { screen: 'forecast', refresh: 904 });
assert.deepEqual(choose('timer', '121', {}), { screen: 'weather', refresh: 1200 }); // time's up: back
assert.deepEqual(choose('timer', '902', {}), { screen: 'weather', refresh: 1200 }); // radar time's up when dry
assert.equal(choose('button', null, {}).screen, 'transport');
assert.equal(choose('powercycle', null, {}).screen, 'weather');
assert.equal(choose('EXT1', '1200', { TRANSPORT_MINUTES: '5' }).refresh, 301);
assert.equal(choose('button', '1200', { TRANSPORT_MINUTES: '20' }).screen, 'transport'); // same minutes still tell apart
// Rain near: timer wakes take turns between radar and weather; the button still steps through all three.
assert.deepEqual(choose('timer', '1200', {}, true), { screen: 'radar', refresh: 902 });
assert.deepEqual(choose('timer', '902', {}, true), { screen: 'weather', refresh: 903 });
assert.deepEqual(choose('timer', '903', {}, true), { screen: 'radar', refresh: 902 });
assert.deepEqual(choose('timer', '902', {}, false), { screen: 'weather', refresh: 1200 }); // rain gone
assert.deepEqual(choose('button', '903', {}, true), { screen: 'transport', refresh: 121 });
assert.deepEqual(choose('button', '902', {}, true), { screen: 'forecast', refresh: 904 }); // radar -> forecast
assert.deepEqual(choose('button', '904', {}, true), { screen: 'weather', refresh: 903 }); // forecast -> weather
assert.deepEqual(choose('timer', '121', {}, true), { screen: 'weather', refresh: 903 });
assert.equal(choose('timer', '1200', { RAIN_MINUTES: '10' }, true).refresh, 602);
// Mornings: the written forecast stands in for weather on timer wakes; the button works as usual.
assert.deepEqual(choose('timer', '1200', {}, false, SEVEN), { screen: 'forecast', refresh: 1200 });
assert.deepEqual(choose('timer', '902', {}, true, SEVEN), { screen: 'forecast', refresh: 903 });
assert.deepEqual(choose('timer', '903', {}, true, SEVEN), { screen: 'radar', refresh: 902 });
assert.deepEqual(choose('button', '1200', {}, false, SEVEN), { screen: 'transport', refresh: 121 });
assert.deepEqual(choose('button', '904', {}, false, SEVEN), { screen: 'weather', refresh: 1200 }); // a press still reaches weather
assert.deepEqual(choose('timer', '1200', { FORECAST_HOURS: 'off' }, false, SEVEN), { screen: 'weather', refresh: 1200 });
assert.deepEqual(choose('timer', '1200', { FORECAST_HOURS: '7-8' }, false, new Date('2026-10-26T08:00:00Z')), { screen: 'weather', refresh: 1200 });
assert.equal(needsRainCheck('button', '1200', {}), false); // opening transport doesn't wait for a forecast
assert.equal(needsRainCheck('button', '121', {}), false); // nor does opening the radar
assert.equal(needsRainCheck('button', '902', {}), false); // radar -> forecast
assert.equal(needsRainCheck('button', '904', {}), true); // forecast -> weather
assert.equal(needsRainCheck('timer', '1200', {}), true);
assert.equal(needsRainCheck('timer', '1200', { RADAR: 'off' }), false);
assert.equal(utcOffset('Europe/London', new Date('2026-07-01T12:00:00Z')), 3600);
assert.equal(utcOffset('Europe/London', new Date('2026-12-01T12:00:00Z')), 0);

// Wrong or missing secret
assert.equal((await worker.fetch(new Request('https://x.workers.dev/wrong/api/display'), env)).status, 404);
assert.equal((await worker.fetch(new Request('https://x.workers.dev/'), {})).status, 503);

// Pairing
const setup = await (await get('/api/setup', { ID: 'AA:BB:CC:DD:EE:FF' })).json();
assert.equal(setup.status, 200);
assert.ok(setup.api_key);
const connected = await worker.fetch(new Request(setup.image_url), env);
assert.equal(connected.headers.get('content-type'), 'image/png');

for (const [source, expected] of [['timer', 'weather'], ['button', 'transport']]) {
  const res = await get('/api/display', { 'Update-Source': source, 'Access-Token': 'byos' });
  const body = await res.json();
  assert.equal(body.status, 0);
  assert.ok(body.image_url.startsWith(`${base}/screen/${expected}-`), body.image_url);
  assert.equal(body.filename.split('-')[0], expected);

  calls.length = 0;
  const started = Date.now();
  const img = await worker.fetch(new Request(body.image_url), env);
  assert.equal(img.status, 200, await img.clone().text());
  assert.equal(img.headers.get('content-type'), 'image/png');
  const png = new Uint8Array(await img.arrayBuffer());
  writeFileSync(join(out, `${expected}.png`), png);
  console.log(`${source} wake -> ${expected}: ${png.length} bytes, ${Date.now() - started} ms, next wake ${body.refresh_rate / 60} min`);
  assert.ok(png.length < 90000, `${expected} image is ${png.length} bytes, over the 90 KB limit`);
  if (expected === 'transport') {
    assert.ok(calls.some((u) => u.includes('StopPoint/490004972S/Arrivals?app_key=test-tfl-key')));
    assert.ok(calls.some((u) => u.includes('StopPoint/490004972N/Arrivals')));
    assert.ok(calls.some((u) => u.includes('GetDepartureBoard/EDW')));
  }
  const html = await (await get(`/screen/${expected}.html`)).text();
  writeFileSync(join(out, `${expected}.html`), html);
  assert.ok(!html.includes('Liquid error'), 'Liquid error in page');
}

// With rain near, a timer wake brings up the radar, drawn from the test tiles.
raining = true;
const rainy = await (await get('/api/display', { 'Update-Source': 'timer', 'Refresh-Rate': '1200' })).json();
assert.ok(rainy.image_url.includes('/screen/radar-'), rainy.image_url);
assert.equal(rainy.refresh_rate, 902);
const radarImg = await worker.fetch(new Request(rainy.image_url), env);
const radarPng = new Uint8Array(await radarImg.arrayBuffer());
writeFileSync(join(out, 'radar.png'), radarPng);
console.log(`timer wake, rain near -> radar: ${radarPng.length} bytes`);
assert.ok(radarPng.length > 5000 && radarPng.length < 90000, `radar image is ${radarPng.length} bytes`);
const radarHtml = await (await get('/screen/radar.html')).text();
writeFileSync(join(out, 'radar.html'), radarHtml);
assert.ok(!radarHtml.includes('Liquid error'), 'Liquid error in radar page');
assert.match(radarHtml, /tilecache\.rainviewer\.com\/v2\/radar\/1792602600/); // newest radar image
assert.match(radarHtml, /oldTiles: "[^"]*\/1792601400",\s+minutes: 20/); // older image for movement
// The written forecast screen.
const forecastHtml = await (await get('/screen/forecast.html')).text();
writeFileSync(join(out, 'forecast.html'), forecastHtml);
assert.ok(!forecastHtml.includes('Liquid error'), 'Liquid error in forecast page');
assert.match(forecastHtml, /arrives around <b>4pm<\/b>/);
const forecastPng = new Uint8Array(await (await worker.fetch(new Request(`${base}/screen/forecast-test.png`), env)).arrayBuffer());
writeFileSync(join(out, 'forecast.png'), forecastPng);
console.log(`forecast: ${forecastPng.length} bytes`);
assert.ok(forecastPng.length > 5000 && forecastPng.length < 90000, `forecast image is ${forecastPng.length} bytes`);
const after = await (await get('/api/display', { 'Update-Source': 'timer', 'Refresh-Rate': '902' })).json();
assert.ok(after.image_url.includes('/screen/weather-'), after.image_url);
raining = false;

// Pressing again while transport is up shows the radar, then the written forecast, then weather.
const toRadar = await (await get('/api/display', { 'Update-Source': 'button', 'Refresh-Rate': '121' })).json();
assert.ok(toRadar.image_url.includes('/screen/radar-'), toRadar.image_url);
assert.equal(toRadar.refresh_rate, 902);
const toForecast = await (await get('/api/display', { 'Update-Source': 'button', 'Refresh-Rate': '902' })).json();
assert.ok(toForecast.image_url.includes('/screen/forecast-'), toForecast.image_url);
assert.equal(toForecast.refresh_rate, 904);
const back = await (await get('/api/display', { 'Update-Source': 'button', 'Refresh-Rate': '904' })).json();
assert.ok(back.image_url.includes('/screen/weather-'), back.image_url);
assert.equal(back.refresh_rate, 1200);

// When the browser can't draw (e.g. the daily limit is used up) the TRMNL gets a message screen.
browserFails = true;
const failed = await worker.fetch(new Request(`${base}/screen/weather-abc.png`), env);
assert.equal(failed.status, 200);
assert.ok(Number(failed.headers.get('content-length')) > 1000);
browserFails = false;

const transportHtml = readFileSync(join(out, 'transport.html'), 'utf8');
assert.match(transportHtml, /Champion Grove|Bus stop/);
assert.match(transportHtml, /<span class="label one-line">2/); // first bus two minutes away
await browser.close();
console.log('all checks passed');
