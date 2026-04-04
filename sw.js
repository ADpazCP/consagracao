const CACHE_NAME = 'adpaz-cadastro-v2'; // MUDE A VERSÃO SEMPRE

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './adpaz.png',
  './logo-icon.png'
];

// INSTALAÇÃO
self.addEventListener('install', event => {
  self.skipWaiting(); // força ativação imediata

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ATIVAÇÃO (REMOVE CACHE ANTIGO)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // remove versões antigas
          }
        })
      );
    })
  );

  self.clients.claim(); // assume controle imediato
});

// FETCH (SEMPRE BUSCA NOVO PRIMEIRO)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone()); // atualiza cache
          return response;
        });
      })
      .catch(() => caches.match(event.request)) // fallback offline
  );
});
