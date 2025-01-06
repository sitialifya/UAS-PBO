const CACHE_NAME = 'toko-roti-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/spicyfloss.jpeg',
    '/sausagediva.jpeg',
    '/chocomeises.jpeg',
    '/rendangfloss.jpeg',
    '/milkybun.jpeg',
    '/coffeebun.jpeg',
    '/chocobun.jpeg',
    '/sugarpillow.jpeg',
    '/flossroll.jpeg',
    '/bananachococheese.jpeg',
    '/icon-192x192.png',
    '/icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch resources from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
// Fetch assets from the cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
