if (!self.define) {
  let i,
    e = {};
  const n = (n, s) => (
    (n = new URL(n + '.js', s).href),
    e[n] ||
      new Promise((e) => {
        if ('document' in self) {
          const i = document.createElement('script');
          (i.src = n), (i.onload = e), document.head.appendChild(i);
        } else (i = n), importScripts(n), e();
      }).then(() => {
        let i = e[n];
        if (!i) throw new Error(`Module ${n} didn’t register its module`);
        return i;
      })
  );
  self.define = (s, o) => {
    const c =
      i ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[c]) return;
    let t = {};
    const f = (i) => n(i, c),
      r = { module: { uri: c }, exports: t, require: f };
    e[c] = Promise.all(s.map((i) => r[i] || f(i))).then((i) => (o(...i), t));
  };
}
define(['./workbox-3e911b1d'], function (i) {
  'use strict';
  self.skipWaiting(),
    i.clientsClaim(),
    i.precacheAndRoute(
      [
        { url: 'assets/index-292d78fa.js', revision: null },
        { url: 'assets/index-993c4eb9.css', revision: null },
        {
          url: 'fonts/Poppins/Poppins-Black.ttf',
          revision: '14d00dab1f6802e787183ecab5cce85e',
        },
        {
          url: 'fonts/Poppins/Poppins-BlackItalic.ttf',
          revision: 'e9c5c588e39d0765d30bcd6594734102',
        },
        {
          url: 'fonts/Poppins/Poppins-Bold.ttf',
          revision: '08c20a487911694291bd8c5de41315ad',
        },
        {
          url: 'fonts/Poppins/Poppins-BoldItalic.ttf',
          revision: '19406f767addf00d2ea82cdc9ab104ce',
        },
        {
          url: 'fonts/Poppins/Poppins-ExtraBold.ttf',
          revision: 'd45bdbc2d4a98c1ecb17821a1dbbd3a4',
        },
        {
          url: 'fonts/Poppins/Poppins-ExtraBoldItalic.ttf',
          revision: '8afe4dc13b83b66fec0ea671419954cc',
        },
        {
          url: 'fonts/Poppins/Poppins-ExtraLight.ttf',
          revision: '6f8391bbdaeaa540388796c858dfd8ca',
        },
        {
          url: 'fonts/Poppins/Poppins-ExtraLightItalic.ttf',
          revision: 'a9bed017984a258097841902b696a7a6',
        },
        {
          url: 'fonts/Poppins/Poppins-Italic.ttf',
          revision: 'c1034239929f4651cc17d09ed3a28c69',
        },
        {
          url: 'fonts/Poppins/Poppins-Light.ttf',
          revision: 'fcc40ae9a542d001971e53eaed948410',
        },
        {
          url: 'fonts/Poppins/Poppins-LightItalic.ttf',
          revision: '0613c488cf7911af70db821bdd05dfc4',
        },
        {
          url: 'fonts/Poppins/Poppins-Medium.ttf',
          revision: 'bf59c687bc6d3a70204d3944082c5cc0',
        },
        {
          url: 'fonts/Poppins/Poppins-MediumItalic.ttf',
          revision: 'cf5ba39d9ac24652e25df8c291121506',
        },
        {
          url: 'fonts/Poppins/Poppins-Regular.ttf',
          revision: '093ee89be9ede30383f39a899c485a82',
        },
        {
          url: 'fonts/Poppins/Poppins-SemiBold.ttf',
          revision: '6f1520d107205975713ba09df778f93f',
        },
        {
          url: 'fonts/Poppins/Poppins-SemiBoldItalic.ttf',
          revision: '9841f3d906521f7479a5ba70612aa8c8',
        },
        {
          url: 'fonts/Poppins/Poppins-Thin.ttf',
          revision: '9ec263601ee3fcd71763941207c9ad0d',
        },
        {
          url: 'fonts/Poppins/Poppins-ThinItalic.ttf',
          revision: '01555d25092b213d2ea3a982123722c9',
        },
        {
          url: 'icons/icon-144x144.png',
          revision: 'd561f99c464ce22127df285261c8f25b',
        },
        {
          url: 'icons/icon-192x192.png',
          revision: '5f4667dc06658452d0f0f39757ca004e',
        },
        {
          url: 'icons/icon-512x512.png',
          revision: 'eccb4f26e0482a4bb6ce29d1a7873c42',
        },
        {
          url: 'images/slide1.png',
          revision: '8eb26f4beba950d9009a49d464fbfd74',
        },
        {
          url: 'images/slide2.png',
          revision: '5cd9c1361735286dff9fb042bbb2f7ff',
        },
        {
          url: 'images/slide3.png',
          revision: 'd4a9953f2840bf2fc24e4faa8b19770f',
        },
        { url: 'index.html', revision: '54b4fbd7ba17314212e80431e49f6a28' },
        { url: 'registerSW.js', revision: '402b66900e731ca748771b6fc5e7a068' },
        {
          url: './icons/icon-192x192.png',
          revision: '5f4667dc06658452d0f0f39757ca004e',
        },
        {
          url: './icons/icon-512x512.png',
          revision: 'eccb4f26e0482a4bb6ce29d1a7873c42',
        },
        {
          url: 'manifest.webmanifest',
          revision: '9c62f4abdec4f9a7d7a41c54ec001643',
        },
      ],
      {}
    ),
    i.cleanupOutdatedCaches(),
    i.registerRoute(
      new i.NavigationRoute(i.createHandlerBoundToURL('index.html'))
    );
});
//# sourceMappingURL=sw.js.map
