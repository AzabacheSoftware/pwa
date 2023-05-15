const STATIC_CACHE = 'static';

const APP_SHELL = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/main.js",
    "./images/icon-32x32.png",
    "./images/imagen.png"
];

self.addEventListener("install", (e) => {
    const cacheStatic = caches
        .open(STATIC_CACHE)
        .then(cache => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
    console.log("fetch! ", e.request);

    e.respondWith(
        caches
            .match(e.request)
            .then(res => res || fetch(e.request))
            .catch(console.log)
    );
});