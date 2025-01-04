const CACHE_NAME = 'toko-roti-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/images/spicy_floss.jpg',
  '/images/sausage_diva.jpg',
  '/images/floss_roll.jpg',
  '/images/choco_meises.jpg',
  '/images/rendang_floss.jpg',
  '/images/milky_bun.jpg',
  '/images/coffee_bun.jpg',
  '/images/choco_bun.jpg',
  '/images/sugar_pillow.jpg',
  '/images/banana_choco_cheese.jpg',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate the service worker
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
