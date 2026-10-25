// Which screen to show on this wake, and when to wake next. Kept apart from
// worker.js because Cloudflare only accepts handler exports from the main file.
//
// The TRMNL reports the refresh rate we gave it last time, so each screen gets a
// slightly different one and that says which screen is up, with nothing stored:
//   weather           WEATHER_MINUTES, a whole number of minutes
//   transport         TRANSPORT_MINUTES + 1 second
//   radar             RAIN_MINUTES + 2 seconds
//   weather, raining  RAIN_MINUTES + 3 seconds (takes turns with radar)

export const BUTTON_SOURCES = new Set(['button', 'EXT0', 'EXT1', 'gpio']);
const minutes = (value, fallback) => Math.max(1, Number(value) || fallback) * 60;

export function screens(env) {
  const rain = minutes(env.RAIN_MINUTES, 15);
  return {
    transport: { screen: env.BUTTON_SCREEN || 'transport', refresh: minutes(env.TRANSPORT_MINUTES, 2) + 1 },
    weather: { screen: env.DEFAULT_SCREEN || 'weather', refresh: minutes(env.WEATHER_MINUTES, 20) },
    radar: { screen: 'radar', refresh: rain + 2 },
    rainyWeather: { screen: env.DEFAULT_SCREEN || 'weather', refresh: rain + 3 },
  };
}

const radarOff = (env) => String(env.RADAR || '').toLowerCase() === 'off';

// The button steps weather -> transport -> radar -> weather. Transport goes back
// to weather on its own after TRANSPORT_MINUTES; the radar after RAIN_MINUTES.
function pressed(showing, s, env) {
  if (showing === s.transport.refresh) return radarOff(env) ? 'weather' : 'radar';
  if (showing === s.radar.refresh) return 'weather';
  return 'transport';
}

// True when this wake needs to know whether rain is near: only when weather is next.
export function needsRainCheck(updateSource, currentRefresh, env) {
  if (radarOff(env)) return false;
  if (!BUTTON_SOURCES.has(updateSource || '')) return true;
  return pressed(Number(currentRefresh), screens(env), env) === 'weather';
}

export function chooseScreen(updateSource, currentRefresh, env, rainNear = false) {
  const s = screens(env);
  const showing = Number(currentRefresh);
  if (BUTTON_SOURCES.has(updateSource || '')) {
    const next = pressed(showing, s, env);
    if (next !== 'weather') return s[next];
    return rainNear ? s.rainyWeather : s.weather;
  }
  // A timer wake: back to the usual screens.
  if (!rainNear) return s.weather;
  // Rain near: take turns between radar and weather. Leaving transport starts with weather.
  return showing === s.radar.refresh || showing === s.transport.refresh ? s.rainyWeather : s.radar;
}
