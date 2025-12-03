const CACHE_NAME = 'palitra-slov-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/img/img.png',
    '/img/cart.png',
    '/img/video.mp4',
    '/img/book1.jpg',
    '/img/book2.jpg',
    '/img/book3.jpg',
    '/img/placeholder.png',
    '/assets/index-*.js',
    '/assets/index-*.css',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache).catch((err) => {
                console.warn('SW: часть ресурсов не закэширована', err);
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Игнорируем video и API-запросы — не кэшируем динамику
    if (
        event.request.destination === 'video' ||
        event.request.url.includes('/api/') ||
        !event.request.url.startsWith(self.location.origin)
    ) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((networkResponse) => {
                // Кэшируем только успешные ответы
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            });
        })
    );
});

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