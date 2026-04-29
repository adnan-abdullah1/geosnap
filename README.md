# GeoSnap

Geo-tagged camera PWA. No ads, no menus, no nonsense.

## Setup (one-time, ~2 minutes)

1. Open `index.html` in any text editor
2. Find this line near the top of the `<script>` block:
   ```js
   const GOOGLE_API_KEY = 'PASTE_YOUR_KEY_HERE';
   ```
3. Replace `'PASTE_YOUR_KEY_HERE'` with your actual Google Maps API key
4. Save

## Files in this folder

- `index.html` — the whole app
- `manifest.json` — PWA install metadata
- `service-worker.js` — offline support
- `icon-192.png`, `icon-512.png` — Android/Chrome app icons
- `apple-touch-icon.png` — iOS home screen icon

## Deploy

Push all files to any free HTTPS host:

- **GitHub Pages** — create repo, upload files, enable Pages in repo settings
- **Netlify** — drag the folder to app.netlify.com/drop
- **Cloudflare Pages** — same

HTTPS is required (camera and GPS won't work otherwise). All three give it free.

After deploying, **come back to Google Cloud Console** and add your live domain to the API key restrictions. Without that, anyone visiting the page can copy your key.

## How your father uses it

1. Opens the URL once → taps the green "📲 Install" button (top right) → app icon appears on his home screen
2. From then on, taps the icon like any app
3. Camera opens → small panel at the bottom shows where he is
4. Taps the white shutter button
5. On the next screen taps the green "Share" button → picks WhatsApp → picks contact → done

## Features

- **Live preview panel** at the bottom of the camera view shows the place name, address, coordinates, and map thumbnail in real time — so what you see is what gets stamped
- **Photo never gets covered** — the watermark sits on its own strip below the image
- **Edit place name** in the preview if Google's auto-detection is wrong
- **Share button** opens the native share sheet (WhatsApp, Gmail, anything)
- **Save button** downloads to device gallery
- **Installable** as a real app on Android (Chrome shows install prompt automatically)

## On iOS

iOS doesn't allow programmatic install prompts. To install on iPhone:
1. Open the URL in Safari
2. Tap the share button (square with up arrow)
3. Tap "Add to Home Screen"

Camera/GPS/Share all work the same as Android after that.

## Customize

- Change date/time format → edit `formatDateTime()`
- Change map zoom → change `14` in the `buildMapImage` call (lower = wider area)
- Change accent colors → search for `#25d366` (share button), `#6cd17a` (status dot)
