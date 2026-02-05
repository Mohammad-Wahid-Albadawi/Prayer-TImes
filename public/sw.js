let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/photo_2024-10-04_19-07-28.jpg',
        '/index.html',
        '/'
      ])
    })
  )
})

this.addEventListener("fetch", (event) => {
    if(!navigator.onLine) {
      event.respondWith(
      caches.match(event.request).then((resp) => {
      if (resp) {
        return resp
      }
    })
  )
}
})
