import { precacheAndRoute } from 'workbox-precaching';
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
  });
  
precacheAndRoute(self.__WB_MANIFEST || []);
