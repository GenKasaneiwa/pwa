///sw.js(Service Worker)はmanifest.jsonと同じ位置（対象配下)
//PWAはhttpsが必須条件です。
//サイトのhostが、httpやipadreess直指定の場合はserviceWorkerがいなくなります。
//localhostの場合は、httpでもよい。

var CACHE_NAME = 'cache-v1';
//ここでは、サービスワーカーがサイトに登録(インストール)されるタイミングで、同時に必要なリソースをキャッシュしてオフラインでも使えるようにしていきます。
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {   
        return cache.addAll('./*');
    })
  );
  console.log('[ServiceWorker] Install');
});

//サービスワーカーがインストールされて有効化されたタイミングで、キャッシュの更新がないかを確認・処理していきましょう。
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

//ここではページが読み込まれた時に、キャッシュに保存されているリソースがある場合はそれを使って処理できるように記述します。オフライン対応。
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