// Turns a plugin into a finished HTML page, the way TRMNL's own servers do:
// fetch the polling URLs, run the Liquid templates, wrap them in the framework page.

import { Liquid } from 'liquidjs';
import plugins from './plugins.generated.js';

export const SCREENS = Object.keys(plugins);

// Cloudflare variable names for the plugin form fields. Anything else uses the
// field name in capitals, e.g. BUS_STOP_1 or LOCATION.
const ENV_NAMES = { rail_api_key: 'RAIL_KEY' };

export function fieldValues(name, env) {
  const values = { ...plugins[name].defaults };
  for (const key of Object.keys(values)) {
    const v = env[ENV_NAMES[key] || key.toUpperCase()];
    if (v !== undefined && v !== '') values[key] = String(v);
  }
  return values;
}

// TRMNL's {% template name %} blocks become partials that {% render "name" %} finds.
const TEMPLATE_BLOCK = /{%-?\s*template\s+(\w+)\s*-?%}([\s\S]*?){%-?\s*endtemplate\s*-?%}/g;

function makeEngine(shared) {
  const templates = {};
  const body = shared.replace(TEMPLATE_BLOCK, (_, name, source) => {
    templates[name] = source;
    return '';
  });
  const engine = new Liquid({ templates, timezoneOffset: 0 });
  // Ruby Liquid divides whole numbers to a whole number; liquidjs would give a fraction.
  engine.registerFilter('divided_by', (a, b) => {
    const x = Number(a), y = Number(b);
    return Number.isInteger(x) && Number.isInteger(y) ? Math.floor(x / y) : x / y;
  });
  return { engine, shared: body };
}

const engines = {};
const engineFor = (name) => (engines[name] ||= makeEngine(plugins[name].shared));

// Seconds east of UTC right now in the given zone, like TRMNL's trmnl.user.utc_offset.
export function utcOffset(timeZone, date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).formatToParts(date).map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return Math.round((asUtc - date.getTime()) / 60000) * 60;
}

// Like TRMNL: a bare JSON array arrives as { data: [...] }, a failed request as {}.
async function poll(url, headers, env) {
  if (env.TFL_KEY && url.startsWith('https://api.tfl.gov.uk/')) {
    url += (url.includes('?') ? '&' : '?') + 'app_key=' + encodeURIComponent(env.TFL_KEY);
  }
  try {
    const res = await fetch(url, { headers: { accept: 'application/json', ...headers } });
    if (!res.ok) console.log(`${res.status} from ${url.split('?')[0]}`);
    const json = await res.json();
    return Array.isArray(json) ? { data: json } : json;
  } catch (e) {
    console.log(`failed ${url.split('?')[0]}: ${e}`);
    return {};
  }
}

function parseHeaders(text) {
  const headers = {};
  for (const pair of text.split('&')) {
    const i = pair.indexOf('=');
    if (i > 0) headers[pair.slice(0, i).trim()] = pair.slice(i + 1).trim();
  }
  return headers;
}

export async function screenData(name, env) {
  const plugin = plugins[name];
  const fields = fieldValues(name, env);
  const liquid = new Liquid();
  const fill = (text) => liquid.parseAndRender(text, fields);
  const urls = await Promise.all(plugin.polling_urls.map(fill));
  const headers = parseHeaders(await fill(plugin.polling_headers || ''));
  const responses = await Promise.all(urls.map((u) => poll(u, headers, env)));
  const data = responses.length === 1 ? responses[0] : Object.fromEntries(responses.map((r, i) => [`IDX_${i}`, r]));
  return { fields, data };
}

// Is rain near? Raining now, or rain due in the next 2 hours, from Open-Meteo's
// 15-minute forecast for the radar screen's location. Errors count as no rain.
export async function rainNear(env) {
  const [lat, lon] = (fieldValues('radar', env).location || '51.4660,-0.0880').split(',').map((v) => v.trim());
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=precipitation` +
    '&minutely_15=precipitation&forecast_minutely_15=8&hourly=precipitation_probability&forecast_hours=2&timezone=auto';
  const data = await poll(url, {}, env);
  const wet = (v) => Number(v) >= 0.1;
  return wet(data.current?.precipitation) ||
    (data.minutely_15?.precipitation || []).some(wet) ||
    (data.hourly?.precipitation_probability || []).some((p) => Number(p) >= 60);
}

export async function renderBody(name, env, { fields, data }) {
  const { engine, shared } = engineFor(name);
  const timeZone = env.TIME_ZONE || 'Europe/London';
  const context = {
    ...data,
    trmnl: {
      user: { utc_offset: utcOffset(timeZone), time_zone_iana: timeZone, locale: 'en' },
      plugin_settings: { instance_name: name, custom_fields_values: fields },
    },
  };
  return engine.parseAndRender(shared + plugins[name].full, context);
}

export function page(body, env) {
  const host = env.FRAMEWORK_HOST || 'https://trmnl.com';
  const version = env.FRAMEWORK_VERSION || 'latest';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${host}/css/${version}/plugins.css">
<script type="module" src="${host}/js/${version}/plugins.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
<style>
  /* Pure black and white, as the e-ink panel shows it. Grey edges on text would
     make the PNG several times bigger, and the TRMNL OG only takes up to 90 KB. */
  body { filter: url(#one-bit); }
</style>
</head>
<body class="environment trmnl">
<svg width="0" height="0" style="position:absolute">
  <filter id="one-bit" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncR type="discrete" tableValues="0 1"/>
      <feFuncG type="discrete" tableValues="0 1"/>
      <feFuncB type="discrete" tableValues="0 1"/>
    </feComponentTransfer>
  </filter>
</svg>
<div class="screen screen--fonts-trmnl">
<div class="view view--full">
${body}
</div>
</div>
</body>
</html>`;
}

export async function renderPage(name, env) {
  return page(await renderBody(name, env, await screenData(name, env)), env);
}
