//var cacheName = 'hello-pwa';
var cacheName = 'my-calendar';
var filesToCache = [
  /*'/my-calendar/',
  '/my-calendar/index.html',
  '/my-calendar/mens.html',
  '/my-calendar/preg.html',
  '/my-calendar/fert.html',
  '/my-calendar/calendar2.css',
  '/my-calendar/calendar2.js',
  '/my-calendar.eu/',
  '/my-calendar.eu/index.html',
  '/my-calendar.eu/mens.html',
  '/my-calendar.eu/preg.html',
  '/my-calendar.eu/fert.html',
  '/my-calendar.eu/calendar2.css',
  '/my-calendar.eu/calendar2.js'  */
  '/',
  '/index.html',
  '/mens.html',
  '/preg.html',
  '/fert.html',
  '/calendar2.css',
  '/calendar2.js',
  'images/flat_web_icon_set/color/Email.png',
  'images/flat_web_icon_set/color/Facebook.png',
  'images/flat_web_icon_set/color/Pinboard.png',
  'images/flat_web_icon_set/color/Pinterest.png',
  'images/flat_web_icon_set/color/Pocket.png',
  'images/flat_web_icon_set/color/Reddit.png',
  'images/flat_web_icon_set/color/Tumblr.png',
  'images/flat_web_icon_set/color/Twitter.png',
  'images/flat_web_icon_set/color/Wordpress.png',
  'images/hello-icon-512.png',
  'images/hello-icon-256.png',
  'images/hello-icon-192.png',
  'images/hello-icon-152.png',
  'images/hello-icon-144.png',
  'images/hello-icon-128.png'
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
