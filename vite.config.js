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
    minify: 'esbuild',         // esbuild가 terser보다 빠름
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue']
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  optimizeDeps: {
    exclude: ['vue-cal', '@babel/runtime'] // 번들에서 제외 (트랜스폼 충돌 방지)
  },
  ssr: {
    noExternal: ['vue-cal'] // SSR/빌드 시 강제 ESM 처리
  }
})
