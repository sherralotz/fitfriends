import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa"; // Import VitePWA

export default defineConfig(() => {  
  return {
    base: '/fitfriends/',
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
        ],
        manifest: {
          name: "Fit Friends",
          short_name: "Fit Friends",
          description: "description",
          start_url: "/fitfriends/",
          scope: "/fitfriends/",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#ffffff",
          icons: [
            {
              src: "/fitfriends/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/fitfriends/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    build: {
      outDir: "dist", // The default build output directory
    },
  };
});
