import '@/styles/index.scss'

import { createSSRApp } from 'vue'

import GlobalModal from '@/components/global/global-modal.vue'
import GlobalTitle from '@/components/global/global-title.vue'
import { setupPinia } from '@/store'

import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.component('GlobalTitle', GlobalTitle)
  app.component('GlobalModal', GlobalModal)
  app.use(setupPinia(app))

  return {
    app
  }
}
