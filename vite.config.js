import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Prayer Times',
        short_name: 'PT',
        description: 'Show prayer times for most capitals in arab world',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png',
          }
        ],
      },
    }),
  ],
})
