import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: false,          // 소스맵 제거 → 가벼움
    target: 'esnext',          // 최신 브라우저만 타겟
    minify: 'esbuild',         // 기본값인데 가장 빠름 (terser보다 가벼움)
    chunkSizeWarningLimit: 800, // 경고 기준치 살짝 키워서 메시지 줄임
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'] // vendor 분리 → 캐싱 용이
        }
      }
    }
  }
})
