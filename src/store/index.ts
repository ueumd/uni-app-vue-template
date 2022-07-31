import { createPinia } from 'pinia'

// import type { App } from 'vue'
import system from './system'
import user from './user'

const pinia = createPinia()

export function setupPinia(app: any) {
  pinia.use(({ store }) => {
    // ... 这里安装插件
  })
  app.use(pinia)
  return app
}

// 统一导出 useStore 方法
export default function useStore() {
  return {
    system: system(),
    user: user()
  }
}
