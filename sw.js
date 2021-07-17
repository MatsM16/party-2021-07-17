const CACHE_NAME = "party-v1";
const PRE_CACHE = [
    "/",
    "/index.html",
    "/data/settings.json",
    "/scripts/site.js",
    "/styles/_guests.css",
    "/styles/_music.css",
    "/styles/_wc.css",
    "/styles/_wifi.css",
    "/styles/settings.css",
    "/styles/site.css",
    "https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Rubik&display=swap"
];
const NETWORK_FIRST = [
    "/data/settings.json"
]

addEventListener("install", event =>
    event.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => cache.addAll(PRE_CACHE))))

addEventListener("fetch", event =>
    event.respondWith(
        caches.match(event.request)
              .then(response =>
                response && !NETWORK_FIRST.includes(event.request.url)
                    ? response
                    : fetch(event.request)
                      .then(response => caches
                        .open(CACHE_NAME)
                        .then(cache => cache.put(event.request, response.clone())
                        .then(() => response))))));