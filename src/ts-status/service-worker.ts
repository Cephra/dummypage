const CACHE = 'ts-status-v1';
const SHELL = [
  '/ts-status/index.html',
  '/ts-status/ts-status.js',
  '/ts-status/manifest.webmanifest',
  '/android-chrome-192x192png',
  '/android-chrome-512x512png'
];

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => {
        self.skipWaiting();
      }),
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
