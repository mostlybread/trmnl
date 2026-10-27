# TRMNL screens for Champion Grove, SE5

A TRMNL e-ink screen run from my own Cloudflare Worker: weather all the time, a rain radar in turns with the weather when rain is near, and live buses and trains on a button press.

| Folder | What it is |
|---|---|
| [`trmnl-server`](trmnl-server) | The Cloudflare Worker the TRMNL talks to. Picks the screen and draws it. |
| [`trmnl-weather`](trmnl-weather) | Weather screen (Open-Meteo). |
| [`trmnl-radar`](trmnl-radar) | Rain radar screen (RainViewer and Open-Meteo). |
| [`trmnl-forecast`](trmnl-forecast) | The day's weather written out under a large date (Open-Meteo). |
| [`trmnl-transport`](trmnl-transport) | Bus and train departures (TfL and National Rail). |

The server builds the four plugins into one file, `trmnl-server/dist/worker.js`. Cloudflare rebuilds and deploys it on every push to `main`, so there's nothing to paste.

**Keys stay out of this repository.** The rail and TfL keys live in the Worker's secrets in Cloudflare. `trmnl-transport/.trmnlp.yml` has a placeholder for local previews only; don't commit a real key there.

## Deploying

Cloudflare's Workers Builds is connected to this repository: build command `npm run build`, deploy command `npx wrangler deploy`, root directory blank. Each push to `main` shows up under the Worker's **Deployments**, and as a check on the commit here.
