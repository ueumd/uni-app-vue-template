import http from './requestConfig'
/**
 * API baseUrl
 * @param env
 * @returns {*}
 */
export function setBaseURL(env = 'development'): string {
  if (!env) {
    import.meta.env.MODE === 'production' ? (env = 'production') : (env = 'development')
  }

  // #ifdef H5
  if (['localhost'].includes(window.location.hostname)) {
    env = 'development'
  }
  if (['test-m.xx.com'].includes(window.location.hostname)) {
    env = 'development'
  }

  if (['m.xx.com'].includes(window.location.hostname)) {
    env = 'production'
  }
  // #endif

  const URL_LIST = {
    development: 'https://test-api.xxxxx.com',
    production: 'https://api.xxx.com'
  }

  return URL_LIST[env]
}

const config = {
  isMock: 1,
  requestUrl: setBaseURL()
}

// http请求配置项
http.setConfig({
  baseUrl: config.requestUrl,
  fileUrl: config.requestUrl,
  defaultUploadUrl: config.requestUrl,
  header: {
    'content-type': 'application/json;charset=UTF-8'
  },
  timeout: 10000,
  config: {
    isPrompt: true,
    load: false,
    isFactory: true
  }
})

export { config, http }
