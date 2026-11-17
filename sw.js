/* FabSteel offline cache — standards update v1.2.1 */
const CACHE_NAME = 'fabsteel-static-v8';
const APP_ASSETS = [
  './',
  './index.html',
  './fabsteel-logo.gif',
  './fabsteel-city-poster.jpg',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Keep installation resilient: one optional asset failure must not break the app shell.
    await Promise.all(APP_ASSETS.map(async (asset) => {
      try {
        const response = await fetch(asset, { cache: 'reload' });
        if (response.ok) await cache.put(asset, response);
      } catch (error) {
        console.warn('FabSteel asset cache skipped:', asset, error);
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('fabsteel-static-') && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok) {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      // Only app navigation falls back to the offline shell. Never return HTML for a missing image.
      if (request.mode === 'navigate') {
        return (await cache.match('./index.html')) || new Response('FabSteel is offline. Please reconnect once to load the app.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
      return new Response('', { status: 504, statusText: 'Offline asset unavailable' });
    }
  })());
});
