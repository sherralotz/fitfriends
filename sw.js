if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const l=e=>n(e,o),d={module:{uri:o},exports:t,require:l};i[o]=Promise.all(s.map((e=>d[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-2CYFQmBI.css",revision:null},{url:"assets/index-BIbAeCYT.js",revision:null},{url:"assets/workbox-window.prod.es5-B9K5rw8f.js",revision:null},{url:"index.html",revision:"8b8901a114139cfa3916ea85a84e5fe7"},{url:"icon-192x192.png",revision:"a1f64b3a80612a03b6554311ada87f19"},{url:"icon-512x512.png",revision:"23e561e76e300ad9a4c58a0a5d128b66"},{url:"manifest.webmanifest",revision:"230a3eddd9e26c78d4e10ef5d1de694b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
