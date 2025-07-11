// A minimal SW that just passes through all requests.
// You can expand it later to cache assets if you want.
self.addEventListener('install', event => {
  console.log('SW installed');
  // Optionally skipWaiting() here
});

self.addEventListener('activate', event => {
  console.log('SW activated');
  // Optionally claim clients here: self.clients.claim()
});

self.addEventListener('fetch', event => {
  // simply proxy all requests to the network
  event.respondWith(fetch(event.request));
});
