// Wordle Solver — Service Worker
// Caches all app files on install so it works fully offline

const CACHE = ‘wordle-solver-v1’;
const FILES = [
‘./’,
‘./index.html’,
‘./manifest.json’
];

// Install: cache all files
self.addEventListener(‘install’, e => {
e.waitUntil(
caches.open(CACHE).then(cache => cache.addAll(FILES))
);
self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener(‘activate’, e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener(‘fetch’, e => {
e.respondWith(
caches.match(e.request).then(cached => cached || fetch(e.request))
);
});