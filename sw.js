//var cacheName = 'hello-pwa';
var cacheName = 'my-calendar';
var filesToCache = [
  '/my-calendar/',
  '/my-calendar/index.html',
  '/my-calendar/mens.html',
  '/my-calendar/preg.html',
  '/my-calendar/fert.html',
  '/my-calendar/calendar2.css',
  '/my-calendar/calendar2.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
