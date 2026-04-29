// GeoSnap service worker - caches app shell for offline use.
// Camera + GPS work offline; only Google Maps (geocoding + tile) needs network.

const CACHE = 'geosnap-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cross-origin requests (Google APIs etc) - never cache, just pass through.
  // Browser handles them with default fetch semantics.
  if (url.origin !== location.origin) return;

  if (event.request.method !== 'GET') return;

  // Cache-first for app shell; fall back to network; on offline, return cache
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy));
        return res;
      }).catch(() => cached);
    })
  );
});
