if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>n(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(a(...e),i)))}}define(["./workbox-26a94402"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"724452b7b2a6b34153b2ceea6de5b891"},{url:"/_next/static/26czlF4BHZdbGknR0BqVQ/_buildManifest.js",revision:"8cad68c64149fe43e8558b882ce509a7"},{url:"/_next/static/26czlF4BHZdbGknR0BqVQ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1dd3208c-22cff63fa816fbf5.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/265-cc04bec0bc71f34b.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/53-8702424fbdc17a38.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/app/_not-found-9fc1088842c2f71b.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/app/auth/page-f6832ae7327aaae7.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/app/discover/page-5e5215e8f8eefa16.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/app/feed/page-5481d451c1f48587.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/app/layout-93e6d3ac199b513e.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/app/page-5a5edc5b39d1fbfb.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/framework-0857c1c24dbfb1d6.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/main-app-9b19eb58dcd8b28b.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/main-cf81ea1fd594e835.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/pages/_app-498e03c53f3714e9.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/pages/_error-3109b7beb80d5c41.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-a0f8ac16060b252a.js",revision:"26czlF4BHZdbGknR0BqVQ"},{url:"/_next/static/css/a8037a87860e293a.css",revision:"a8037a87860e293a"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/manifest.json",revision:"970f935b4c71621d28a2f29b7855e6f7"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
