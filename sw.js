importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'minimal-pwa-10282333'
var cacheList=[
  '/',
  'index.html',
  '/css/bootstrap.min.css'
  '/css/niuqiqi-demo.css' 
  '/css/style.css'  
  '/images/128.png'    
  '/images/512.png'  
]
self.addEventListener('install',e =>{
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})
