const CACHE_NAME = 'roti-aroma-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
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

// Install service worker and cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch files from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
