importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'minimal-pwa-2'
var cacheList=[
  '/',
  'index.html',
  'main.css',
  'youhun.png'
]
self.addEventListener('install',e =>{
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})
