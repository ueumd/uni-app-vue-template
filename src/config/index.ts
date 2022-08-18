import http from './requestConfig'
/**
 * API baseUrl
 * @param env
 * @returns {*}
 */
export function setBaseURL(env = 'development'): string {
  process.env.NODE_ENV === 'production' ? (env = 'production') : (env = 'development')

  // #ifdef H5
  if (['localhost'].includes(window.location.hostname)) {
    env = 'development'
  }
  if (['test-m.xxx.com'].includes(window.location.hostname)) {
    env = 'development'
  }

  if (['m.xxx.com'].includes(window.location.hostname)) {
    env = 'production'
  }
  // #endif
  const URL_LIST = {
    development: 'http://localhost:3000',
    production: 'https://api.xxx.com'
  }

  return URL_LIST[env]
}

const config = {
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
