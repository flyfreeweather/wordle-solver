// Wordle Solver — Service Worker
// Strategy: serve from cache immediately (fast load), but always check
// the network for a fresh version in the background. If a new version
// is found, it activates immediately and the page reloads automatically.

const CACHE = 'wordle-solver-v2';
const FILES = [
 './',
 './index.html',
 './manifest.json',
 './icon-192.png',
 './icon-512.png'
];

// ── Install: cache all files immediately ────────────────────────────────────
self.addEventListener('install', e => {
 e.waitUntil(
   caches.open(CACHE).then(cache => cache.addAll(FILES))
 );
 // Take over immediately without waiting for old SW to finish
 self.skipWaiting();
});

// ── Activate: delete ALL old caches, then take control of all pages ─────────
self.addEventListener('activate', e => {
 e.waitUntil(
   caches.keys().then(keys =>
     Promise.all(keys.filter(k => k !== CACHE).map(k => {
       console.log('[SW] Deleting old cache:', k);
       return caches.delete(k);
     }))
   ).then(() => self.clients.claim())
 );
});

// ── Fetch: cache-first, but revalidate in background ────────────────────────
self.addEventListener('fetch', e => {
 // Only handle GET requests for our own origin
 if (e.request.method !== 'GET') return;

 e.respondWith(
   caches.open(CACHE).then(cache =>
     cache.match(e.request).then(cached => {
       // Always fetch fresh copy from network in background
       const networkFetch = fetch(e.request).then(networkResponse => {
         if (networkResponse && networkResponse.status === 200) {
           cache.put(e.request, networkResponse.clone());
         }
         return networkResponse;
       }).catch(() => null);

       // Return cached version immediately if available,
       // otherwise wait for network
       return cached || networkFetch;
     })
   )
 );
});

// ── Listen for skip-waiting message from the page ───────────────────────────
self.addEventListener('message', e => {
 if (e.data === 'skipWaiting') self.skipWaiting();
});