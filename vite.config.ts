import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'

const CWD = process.cwd()

// 环境变量
// const BASE_ENV_CONFIG = loadEnv('', CWD)
// const DEV_ENV_CONFIG = loadEnv('development', CWD)
// const PROD_ENV_CONFIG = loadEnv('production', CWD)

export default ({ command, mode }: ConfigEnv): UserConfig => {
  console.log('===command===', command, mode)
  // 环境变量
  const { VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_IS_MOCK } = loadEnv(mode, CWD)

  console.log('VITE_IS_MOCK', Boolean(VITE_IS_MOCK))

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        }
      ]
    },
    plugins: [
      AutoImport({
        dts: './.auto-imports.d.ts',
        imports: ['vue', 'pinia'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: 'readonly'
        }
      }),
      uni(),
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: VITE_IS_MOCK === 'true',
        prodEnabled: false,
        logger: true
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";'
        }
      }
    },
    build: {
      terserOptions: {
        compress: {
          keep_infinity: Boolean(VITE_DROP_CONSOLE),
          drop_console: Boolean(VITE_DROP_CONSOLE),
          drop_debugger: Boolean(VITE_DROP_CONSOLE)
        }
      }
    }
  }
}
