# TRMNL server on Cloudflare

Your TRMNL talks to this server instead of TRMNL's own. It shows **weather** all the time (a **written forecast** in its place from 6 to 9am), a **rain radar** in turns with the weather when rain is near, and **live bus and train times** when you press the button. Press again for the radar, again for the written forecast, and once more to go back to weather. Leave transport alone and it goes back to weather on its own after 2 minutes.

How it works:

- The TRMNL wakes up on a timer (every 20 minutes here) and asks for a screen. It also wakes when you press the button. Each time, it tells the server why it woke.
- **Timer wake:** the server draws the weather screen and tells the TRMNL to come back in 20 minutes.
- **Timer wake when rain is near:** if it's raining at your location, rain is due in the next 2 hours, or the chance of rain is 60% or more (from Open-Meteo), the server swaps between the radar map and the weather every 15 minutes instead. Once it's dry again, it's back to weather every 20 minutes.
- **Button wake:** the server fetches TfL and National Rail times right then, draws the transport screen, and tells the TRMNL to come back in 2 minutes. That next wake is a timer wake, so weather returns.
- **Button wake while buses are showing:** the radar, which stays up for 15 minutes and then goes back to weather.
- **Button wake while the radar is showing:** the written forecast, which stays up for 15 minutes.
- **Button wake while the forecast is showing:** back to weather. So the button steps weather, transport, radar, forecast, weather, whether or not rain is near. With `RADAR` set to `off` it skips the radar.
- **Mornings:** from 6 to 9am the written forecast takes the weather screen's place on timer wakes (and takes turns with the radar if rain is near). A button press still steps through the screens as usual.
- The server knows which screen is up from the wake interval the TRMNL reports. Transport's interval is set one second off a whole minute to mark it (radar two seconds, rainy weather three), so the server needs no storage.
- It draws the screens from your three plugins, `../trmnl-transport`, `../trmnl-weather` and `../trmnl-radar`, so they look the same as they would on TRMNL's service. Cloudflare's headless browser turns each one into a black-and-white image of about 15 KB.

It runs as a free **Cloudflare Worker**, separate from your departures page.

## Set it up

You'll need: your Cloudflare account, the rail key and TfL key you already use for the departures page, and the TRMNL.

### 1. Create the Worker

**From GitHub (recommended):** Cloudflare builds and deploys the Worker every time `main` changes in [mostlybread/trmnl](https://github.com/mostlybread/trmnl).

1. In Cloudflare, open the `trmnl` Worker (or **Workers & Pages → Create → Import a repository** for a new one).
2. Go to **Settings → Build → Connect**, pick GitHub and the `mostlybread/trmnl` repository, branch `main`.
3. Set **Build command** to `npm run build` and leave **Deploy command** as `npx wrangler deploy`. Leave the root directory blank.
4. Save. The first build starts straight away; its log is under **Deployments**.

`wrangler.toml` at the top of the repository names the Worker `trmnl`, so it must match the Worker's name in Cloudflare. Your secrets and variables are kept.

**By hand:** go to **Workers & Pages → Create → Create Worker**, call it `trmnl` and click **Deploy**. Click **Edit code**, delete what's there, paste the whole of [`dist/worker.js`](dist/worker.js), and click **Deploy**.

### 2. Let it use Cloudflare's browser

The Worker uses Cloudflare's headless browser to turn each screen into an image. It needs your account ID and a token for that.

1. **Account ID:** on the **Workers & Pages** overview, it's shown on the right as **Account ID**. Copy it.
2. **Token:** go to **My Profile → API Tokens → Create Token → Create Custom Token**. Name it `trmnl browser`. Under **Permissions** choose **Account**, then **Browser Rendering** (it may be called **Browser Run**), then **Edit**. Click **Continue to summary → Create Token** and copy the token.

### 3. Add the settings

On the `trmnl` Worker, go to **Settings → Variables and Secrets → Add** and add these. Use type **Secret** for all of them:

| Name | Value |
|---|---|
| `SECRET` | A made-up password of 16 or more letters and numbers, e.g. from a password generator. It goes in the server address, so only your TRMNL can use the server. |
| `RAIL_KEY` | Your Rail Data Marketplace key (the same one as the departures page) |
| `TFL_KEY` | Your TfL key (the same one as the departures page) |
| `CF_ACCOUNT_ID` | The account ID from step 2 |
| `CF_API_TOKEN` | The token from step 2 |

Click **Deploy** after adding them.

### 4. Check it in your browser

Your server address is the Worker's address plus your secret, for example:

```
https://trmnl.<your-subdomain>.workers.dev/<SECRET>
```

Try these on your phone or computer:

- `<server address>/screen/transport.html` shows the transport page with live data. This doesn't use any browser time.
- `<server address>/screen/transport.png` shows the actual image the TRMNL will get. Each one uses a few seconds of browser time.

If the PNG shows "Screen not drawn", check the account ID and token. The Worker's **Logs** tab says what went wrong.

### 5. Point the TRMNL at it

1. **Update the firmware first.** While the TRMNL is still on TRMNL's own service, let it pick up any firmware update. This server doesn't send updates.
2. **Open setup mode.** Hold the button for 6–7 seconds, until the TRMNL shows setup mode. On your phone, join the **TRMNL** Wi-Fi network, and the setup page opens.
3. **Enter your server.** Tap **Advanced settings**. In **API server**, enter your server address, e.g. `https://trmnl.<your-subdomain>.workers.dev/<SECRET>`, with no slash at the end.
4. **Reconnect.** Go back, pick your Wi-Fi, and connect.

The TRMNL shows **Connected**, then the weather at its next refresh. Press the button to check it switches to buses.

**Switching back to TRMNL's service:** open setup mode again and clear the API server field.

## Settings you can change

Add these as plain-text **Variables** on the Worker. They're all optional.

| Variable | Default | What it does |
|---|---|---|
| `TRANSPORT_MINUTES` | `2` | How long buses stay up after a press |
| `WEATHER_MINUTES` | `20` | How often the weather screen redraws |
| `RAIN_MINUTES` | `15` | When rain is near, how long each of radar and weather stays up. Also how long the radar stays after a press |
| `RADAR` | on | Set to `off` to never show the radar |
| `FORECAST_HOURS` | `6-9` | When the written forecast replaces the weather screen, from the first hour up to the second. `off` to only show it from the button |
| `BUS_STOP_1`, `BUS_STOP_2` | `490004972S`, `490004972N` | TfL stop IDs (Champion Grove E and H) |
| `STATION_CRS` | `DMK` | Main station, split by operator |
| `STATION_OPERATORS` | `Thameslink, London Overground, Southeastern` | Operators to split it by |
| `SECOND_STATION_CRS` | `EDW` | Second station, as one list |
| `LOCATION` | `51.4660,-0.0880` | Weather and radar location, as `latitude,longitude` |
| `PLACE_NAME` | `Denmark Hill` | Shown on the weather and radar screens |

The defaults come from the plugins' `settings.yml` files.

## Free plan limits

Cloudflare's free plan gives **10 minutes of browser time a day**, and the browser draws one screen every 10 seconds at most.

- Weather every 20 minutes is 72 screens a day. Each one should take a few seconds of browser time, so weather uses roughly half the daily allowance. That's an estimate until it has run for a day.
- Button presses use the rest. Each press draws one screen, and about 20 a day should fit.
- **Rainy spells use more.** While rain is near the TRMNL redraws every 15 minutes instead of 20, so a whole wet day uses about a third more and could run the allowance short. Raise `RAIN_MINUTES` to 20, or set `RADAR` to `off`, if that happens.
- **When the day's time runs out,** the TRMNL shows "Screen not drawn" until it resets at midnight UTC.
- **To use less,** raise `WEATHER_MINUTES`. The weather screen has no clock, so 30 or 60 minutes looks the same.
- **To remove the limit,** Workers Paid ($5 a month) includes 10 hours of browser time a month.

The Worker's **Logs** tab shows each wake and how big each image was, which helps if something looks wrong.

## Changing things

The Worker is built from `src/` and the two plugin folders:

```
npm install
node build.mjs       # writes dist/worker.js to paste into Cloudflare
npm test             # draws all three screens with sample data and a local Chromium
```

After changing a plugin's `.liquid` files, push to `main` and Cloudflare rebuilds it. If you deploy by hand, run `node build.mjs` and paste the new `dist/worker.js`.

## Files

| File | What it is |
|---|---|
| `dist/worker.js` | The finished Worker. Cloudflare builds its own copy from GitHub; this one is for pasting by hand. |
| `src/worker.js` | Answers the TRMNL: picks the screen from why it woke, and draws images. |
| `src/screens.js` | Fetches each plugin's data, runs its Liquid templates and builds the page. |
| `src/images/` | The "Connected" and "Screen not drawn" images. |
| `src/plugins.generated.js` | All three plugins' templates and settings, copied in by `build.mjs`. |
| `test/run.mjs` | Pretends to be a TRMNL, checking setup, timer wakes (dry and rainy), button wakes, and the image sizes. |
