// 서비스 워커(Service Worker): 크롬이 "설치 가능한 앱"으로 인식하도록 돕는 파일입니다.
// 캐시(저장)를 하지 않고, 파일을 불러올 때마다 서버에 바뀐 내용이 있는지 확인합니다.
// 그래서 깃허브 페이지에 새로 올린 내용이 최대한 빨리 반영됩니다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const sameOrigin = new URL(req.url).origin === self.location.origin;

  // 같은 사이트의 GET 요청만 "변경 확인 후 받기(no-cache)"로 바꿉니다
  if (req.method === 'GET' && sameOrigin) {
    e.respondWith(
      fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' })
        .catch(() => fetch(req))
    );
    return;
  }
  e.respondWith(fetch(req));
});
