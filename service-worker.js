///sw.js(Service Worker)はmanifest.jsonと同じ位置（対象配下)
//PWAはhttpsが必須条件です。
//サイトのhostが、httpやipadreess直指定の場合はserviceWorkerがいなくなります。
//localhostの場合は、httpでもよい。

// service-worker.js
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
  });
  
  self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
  });
  
  // 現状では、この処理を書かないとService Workerが有効と判定されないようです
  self.addEventListener('fetch', function(event) {});