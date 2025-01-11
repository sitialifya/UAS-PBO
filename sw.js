const CACHE_NAME = 'toko-roti-cache-v1';
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
    '/script.js', // Jika ada file JavaScript tambahan
];

// Install Service Worker dan cache file penting
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Mengambil file dari cache jika offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Jika ada respons yang dicache, gunakan itu
            if (cachedResponse) {
                return cachedResponse;
            }
            // Jika tidak, ambil dari jaringan
            return fetch(event.request);
        })
    );
});

// Menghapus cache lama ketika service worker baru terpasang
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
