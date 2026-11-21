// Trainingsbuch Service Worker – bei jedem Update VERSION erhöhen.
const VERSION = '1.3.0';
const CACHE = 'trainingsbuch-' + VERSION;
const SHELL = ['./', 'index.html', 'app.js', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'fonts/barlow-condensed-latin-600-normal.woff2', 'fonts/barlow-condensed-latin-700-normal.woff2', 'fonts/barlow-condensed-latin-ext-600-normal.woff2', 'fonts/barlow-condensed-latin-ext-700-normal.woff2', 'fonts/barlow-latin-400-normal.woff2', 'fonts/barlow-latin-500-normal.woff2', 'fonts/barlow-latin-600-normal.woff2', 'fonts/barlow-latin-ext-400-normal.woff2', 'fonts/barlow-latin-ext-500-normal.woff2', 'fonts/barlow-latin-ext-600-normal.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, {cache: 'reload'})))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('trainingsbuch-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Sync-Server nie cachen
  // App-Dateien: erst Cache (schnell & offline), Updates kommen über neue SW-Version
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(r => {
    if (r.ok) caches.open(CACHE).then(c => c.put(req, r.clone()));
    return r;
  }).catch(() => caches.match('index.html'))));
});
