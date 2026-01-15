import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  server: {
    // host: '0.0.0.0',
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000
    }
    // HMR will automatically use the same port
  }
})
