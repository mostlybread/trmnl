// A tiny TRMNL server ("bring your own server").
//
// The TRMNL asks /api/display each time it wakes. Its Update-Source header says
// why it woke: "timer" for its normal schedule, "button" when the button was pressed.
//   - timer wake  -> the weather screen, next wake in WEATHER_MINUTES
//   - button wake -> the transport screen with times fetched right now,
//                    next wake in TRANSPORT_MINUTES (that timer wake brings weather back)
//   - button wake while transport is showing -> the rain radar, next wake in RAIN_MINUTES
//   - button wake while the radar is showing -> back to weather
//   - when rain is near (raining now or due within 2 hours), timer wakes take turns
//     between the rain radar and weather, every RAIN_MINUTES
// The TRMNL also sends its current Refresh-Rate, i.e. the one we gave it last time.
// Each screen's is a few seconds off a whole minute in its own way, so that says which screen is up,
// and nothing needs storing.
//
// Every address sits under /<SECRET>/, so only a device given the full server
// address can use it (and spend the free browser minutes).

import { SCREENS, renderPage, rainNear } from './screens.js';
import { chooseScreen, needsRainCheck } from './choose.js';
import CONNECTED_PNG from './images/connected.png';
import UNAVAILABLE_PNG from './images/unavailable.png';

const PNG_LIMIT = 90000; // largest image the TRMNL OG can receive

const pngResponse = (png) =>
  new Response(png, { headers: { 'content-type': 'image/png', 'content-length': String(png.length) } });
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });


async function screenshot(html, env) {
  const options = {
    html,
    viewport: { width: 800, height: 480 },
    gotoOptions: { waitUntil: 'networkidle0', timeout: 12000 },
    screenshotOptions: { type: 'png' },
  };
  for (let attempt = 0; ; attempt++) {
    try {
      return await screenshotOnce(options, env);
    } catch (e) {
      // The free plan allows one screenshot every 10 seconds; wait once if we hit that.
      if (attempt > 0 || !String(e).includes(' 429')) throw e;
      console.log('browser busy, retrying');
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

async function screenshotOnce(options, env) {
  let res;
  if (env.BROWSER && typeof env.BROWSER.quickAction === 'function') {
    res = await env.BROWSER.quickAction('screenshot', options);
  } else {
    if (!env.CF_ACCOUNT_ID || !env.CF_API_TOKEN) throw new Error('CF_ACCOUNT_ID and CF_API_TOKEN are not set');
    res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/browser-rendering/screenshot`, {
      method: 'POST',
      headers: { authorization: `Bearer ${env.CF_API_TOKEN}`, 'content-type': 'application/json' },
      body: JSON.stringify(options),
    });
  }
  if (res instanceof Response) {
    if (!res.ok) throw new Error(`browser rendering ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const used = res.headers.get('x-browser-ms-used');
    if (used) console.log(`browser time ${used} ms`);
    return new Uint8Array(await res.arrayBuffer());
  }
  return new Uint8Array(res instanceof ArrayBuffer ? res : res.buffer || res);
}

async function handle(request, env) {
  const url = new URL(request.url);
  if (!env.SECRET || env.SECRET.length < 12) {
    return new Response('Set a SECRET variable (12+ random characters) to finish setting up.', { status: 503 });
  }
  const prefix = `/${env.SECRET}`;
  if (url.pathname === '/') return new Response('TRMNL server is running.');
  if (!url.pathname.startsWith(prefix + '/')) return new Response('Not found', { status: 404 });
  const path = url.pathname.slice(prefix.length);
  const base = url.origin + prefix;
  const stamp = Date.now().toString(36);

  if (path === '/api/setup') {
    // Asked once when the device is first pointed at this server.
    return json({
      status: 200,
      api_key: 'byos',
      friendly_id: 'HOME',
      image_url: `${base}/connected.png`,
      message: 'Connected to your Cloudflare server',
    });
  }

  if (path === '/api/display') {
    const source = request.headers.get('update-source');
    const current = request.headers.get('refresh-rate');
    const rain = needsRainCheck(source, current, env) ? await rainNear(env) : false;
    const { screen, refresh } = chooseScreen(source, current, env, rain);
    console.log(`wake: ${source || 'unknown'}${rain ? ', rain near' : ''} -> ${screen}, next in ${Math.round(refresh / 60)} min`);
    return json({
      status: 0,
      // A new name every time, or the TRMNL would reuse its saved copy.
      image_url: `${base}/screen/${screen}-${stamp}.png`,
      filename: `${screen}-${stamp}`,
      refresh_rate: refresh,
      reset_firmware: false,
      update_firmware: false,
      firmware_url: null,
      special_function: 'none',
    });
  }

  if (path === '/api/log') return new Response(null, { status: 204 });
  if (path === '/connected.png') return pngResponse(CONNECTED_PNG);

  // /screen/weather-xyz.png draws the screen; /screen/weather.html shows the page
  // in an ordinary browser for checking, without using any browser minutes.
  const m = path.match(/^\/screen\/([a-z]+)(?:-[a-z0-9]+)?\.(png|html)$/);
  if (m && SCREENS.includes(m[1])) {
    const html = await renderPage(m[1], env);
    if (m[2] === 'html') return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    try {
      const png = await screenshot(html, env);
      console.log(`${m[1]}: ${png.length} bytes`);
      if (png.length > PNG_LIMIT) throw new Error(`${m[1]} is ${png.length} bytes, over the TRMNL's ${PNG_LIMIT} byte limit`);
      return pngResponse(png);
    } catch (e) {
      // Show a message on the TRMNL rather than its own error screen; the next wake tries again.
      console.log(`could not draw ${m[1]}: ${e}`);
      return pngResponse(UNAVAILABLE_PNG);
    }
  }

  return new Response('Not found', { status: 404 });
}

export default {
  async fetch(request, env) {
    try {
      return await handle(request, env);
    } catch (e) {
      console.log(`error: ${e.stack || e}`);
      return new Response('Server error', { status: 500 });
    }
  },
};
