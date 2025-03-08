// Install event — cache files
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Service Worker...');
    event.waitUntil(
      caches.open('app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/favicon.ico',
          '/manifest.json',
          '/assets/logo.png',
        ]);
      })
    );
  });
  
  // Activate event — clean up old caches
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated!');
    event.waitUntil(
      caches.keys().then((keyList) =>
        Promise.all(
          keyList.map((key) => {
            if (key !== 'app-cache') {
              console.log('[Service Worker] Removing old cache:', key);
              return caches.delete(key);
            }
          })
        )
      )
    );
  });
  
  // Fetch event — serve from cache or network
  self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching:', event.request.url);
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  