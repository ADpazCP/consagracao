const CACHE_NAME = 'adpaz-cadastro-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './adpaz.png',
  './logo-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});