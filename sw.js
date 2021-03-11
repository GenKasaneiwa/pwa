///sw.js(Service Worker)はmanifest.jsonと同じ位置（対象配下)
//PWAはhttpsが必須条件です。
//サイトのhostが、httpやipadreess直指定の場合はserviceWorkerがいなくなります。
//localhostの場合は、httpでもよい。

var CACHE_NAME = 'cache-v1';
//インストール
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {   
        return cache.addAll('./*');
    })
  );
  console.log('[ServiceWorker] Install');
});

//キャッシュ比較
self.addEventListener('activate', function(event) {  
  event.waitUntil(  
    caches.keys().then(function(cache) {
      cache.map(function(name) {
        if(CACHE_NAME !== name) caches.delete(name);
      })
    })  
  );
  console.log('[ServiceWorker] Activate');
});  

//オフライン有効化
self.addEventListener('fetch', function(event) {
  event.respondWith( 
    caches.match(event.request).then(function(res) {
        if(res) return res;
      
        return fetch(event.request);
    }) 
  );
});

  // // 現状では、この処理を書かないとService Workerが有効と判定されないようです
  // self.addEventListener('fetch', function(event) {});