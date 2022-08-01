import Request from '@/lib/request/index'

const $http = new Request({})

// 当前接口请求数
let requestNum = 0
// 请求开始拦截器
$http.requestStart = function (options) {
  if (options.load) {
    if (requestNum <= 0) {
      // 打开加载动画
      uni.showLoading({ title: '加载中', mask: true })
    }
    requestNum += 1
  }

  // const { token, systemInfo } = uni.flux.store.state
  // options.header.token = token

  return options // return false 表示请求拦截，不会继续请求
}

$http.requestEnd = function (options) {
  // 判断当前接口是否需要加载动画
  if (options.load) {
    requestNum = requestNum - 1
    if (requestNum <= 0) {
      uni.hideLoading()
    }
  }
}

$http.dataFactory = async function (res) {
  // console.log('接口请求数据', {
  //   url: res.url,
  //   resolve: res.response,
  //   header: res.header,
  //   data: res.data,
  //   method: res.method
  // })
  if (res.response.statusCode && res.response.statusCode === 200) {
    let httpData = res.response.data
    if (typeof httpData === 'string') {
      httpData = JSON.parse(httpData)
    }
    // 判断数据是否请求成功
    // 判断数据是否请求成功
    // httpData.errCode = 600
    if (httpData.errCode === 0) {
      return Promise.resolve(httpData.data)
    } else if (httpData.errCode === 600 || httpData.errCode === 603 || httpData.errCode === 602) {
      return Promise.reject(res)
    }
    console.error('【errCode异常：】', httpData.errCode, httpData.message)
    return Promise.reject(httpData)
  }
  // 返回错误的结果(catch接受数据)
  if (res.response.data.errCode === 600 || res.response.data.errCode === 603 || res.response.data.errCode === 602) {
    /**
     * 603 token过期
     * 600 帐号在其他设备登录
     * 602 用户未登录
     */
    return Promise.reject(res)
  }
  console.error('【接口-未知错误：】', res)
  return Promise.reject('未知错误')
}
// 错误回调
$http.requestError = function (res) {
  // e.statusCode === 0 是参数效验错误抛出的
  if (typeof res === 'object' && res.statusCode === 0) {
    return Promise.reject(res.errMsg)
  }
  return Promise.reject('系统错误')
}

export default $http
