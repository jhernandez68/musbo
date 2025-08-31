const CACHE='museos-bogota-v1'
const URLS = ['/', '/index.html', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/src/data/museos.json']
self.addEventListener('install', e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting()))})
self.addEventListener('activate', e=>{e.waitUntil(self.clients.claim())})
self.addEventListener('fetch', e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))) })