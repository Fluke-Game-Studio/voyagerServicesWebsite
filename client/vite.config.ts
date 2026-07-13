import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5180,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'vendor-three'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide'
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
