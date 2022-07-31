import uni from '@dcloudio/vite-plugin-uni'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
const isDev = process.env.USE_MOCK === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      dts: './.auto-imports.d.ts',
      imports: ['vue', 'pinia'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly' // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    viteMockServe({
      logger: true,
      watchFiles: true,
      mockPath: 'mock',
      supportTs: true,
      localEnabled: isDev,
      prodEnabled: false
    }),
    uni()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080
    // proxy: {
    //   '/api': {
    //     target: 'https://xx.xxx.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        assetFileNames: '[ext]/[name].[hash].[ext]',
        chunkFileNames: 'js/[name].[hash].js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})