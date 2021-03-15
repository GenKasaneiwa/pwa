///sw.js(Service Worker)はmanifest.jsonと同じ位置（対象配下)
//PWAはhttpsが必須条件です。
//サイトのhostが、httpやipadreess直指定の場合はserviceWorkerがいなくなります。
//localhostの場合は、httpでもよい。
//iOSではオフラインデータを50Mbしか保存できないという厳しい制限がある

//キャッシュ名
var CACHE_NAME = "cache-v2";

//キャッシュに入れるリソースのパス
var urlsToCache = [
   "./",
   "./manifest.json", 
   "./next.html"
];

//インストール状態のイベント処理
self.addEventListener("install", function (event) {
   event.waitUntil(
      //キャッシュの中に必要なリソースを格納する
      caches.open(CACHE_NAME).then(function (cache) {
         return cache.addAll(urlsToCache);
      })
   );
});

//有効化状態のイベント処理
self.addEventListener("activate", function (event) {
   event.waitUntil(
      //現在のキャッシュをすべて取得する
      caches.keys().then(function (cache) {
         //新しいキャッシュ以外は削除する
         cache.map(function (name) {
            if (CACHE_NAME !== name) caches.delete(name);
         });
      })
   );
});

//リクエスト取得状態のイベント処理
self.addEventListener("fetch", function (event) {
   event.respondWith(
      //リクエストに応じたリソースがキャッシュにあればそれを使う
      caches.match(event.request).then(function (res) {
         if (res) return res;

         return fetch(event.request);
      })
   );
});

 // fetchAPI用 返されたBodyをjsonにしてPromise.resolve()する
 var handleResponse = function (response) {
   return response.json()
     .then(function (json) {
       if (response.ok) {
         return json;
       } else {
         return Promise.reject(response);
       }
     });
 };
 
 function getJsonData() {
   var req_bnr = new Request("./test.json", {
     method: "get"
   });
   fetch(req_bnr)
     .then(handleResponse)
     .then(function (json) {
       var items = [];
       $.each(data, function (key, val) {
         items.push("<li id='" + key + "'>" + val + "</li>");
       });
 
       $("<ul/>", {
         "class": "my-new-list",
         html: items.join("")
       }).appendTo("body");
     })
 };

