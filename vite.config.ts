import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest : {
        icons : [ {
          src : "/icons/ninja.png",
          sizes : "512x512",
          type :  "image/png",
          purpose : "any maskable"
        }]

      },
      workbox:{
        runtimeCaching : [{
          urlPattern : ({url}) =>{
            return true;
          },
          handler : "CacheFirst" as const,
          options : {
            cacheName : "api-cache",
            cacheableResponse : {
              statuses : [0,200]
            }
          }
        }]
      }
    })
  ],
})
