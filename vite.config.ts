import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "./",
  plugins: [
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,ttf}"],
        sourcemap: true,
      },
      manifest: {
        theme_color: "#f69435",
        background_color: "#f69435",
        display: "standalone",
        scope: "./",
        start_url: "./index.html",
        name: "Hodaripuoti",
        short_name: "MyApp",
        icons: [
          {
            src: "./icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "./icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "./icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
