// Importing workbox-window and idb
import * as workboxWindow from 'workbox-window';

// Importing necessary Workbox modules
import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

// Precache and route
precacheAndRoute(self.__WB_MANIFEST);

// Configure CacheFirst strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the cache for specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register CacheFirst strategy for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching with StaleWhileRevalidate strategy
registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg|gif)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// Register the service worker
if ('serviceWorker' in navigator) {
    const workbox = new workboxWindow.Workbox('/service-worker.js');

    workbox.register();
}










// const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
// const { CacheFirst } = require('workbox-strategies');
// const { registerRoute } = require('workbox-routing');
// const { CacheableResponsePlugin } = require('workbox-cacheable-response');
// const { ExpirationPlugin } = require('workbox-expiration');
// const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// precacheAndRoute(self.__WB_MANIFEST);

// const pageCache = new CacheFirst({
//   cacheName: 'page-cache',
//   plugins: [
//     new CacheableResponsePlugin({
//       statuses: [0, 200],
//     }),
//     new ExpirationPlugin({
//       maxAgeSeconds: 30 * 24 * 60 * 60,
//     }),
//   ],
// });

// warmStrategyCache({
//   urls: ['/index.html', '/'],
//   strategy: pageCache,
// });

// registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// // TODO: Implement asset caching
// registerRoute();
