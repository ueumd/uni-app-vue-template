import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/createUser',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 0,
        message: 'ok',
        data: {
          name: 'mockjs ok'
        }
      }
    }
  },
  {
    url: '/api/v1/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        msg: 'success',
        data: {
          token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdDnKWw-NN6-',
          uid: `${Date.now()}`
        }
      }
    }
  },
  {
    url: '/api/v1/test',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 200,
        msg: 'success',
        data: {
          userId: '1',
          username: 'admin',
          desc: 'manager',
          token: 'fakeToken1'
        }
      }
    }
  },
  {
    url: '/api/v1/test',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        msg: 'success',
        data: {
          userId: '2',
          username: 'admin',
          desc: 'manager',
          token: 'fakeToken1'
        }
      }
    }
  }
] as MockMethod[]
