import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/login',
    method: 'post',
    response: ({ body }) => {
      console.log(body)
      return {
        errCode: 0,
        msg: 'success',
        data: {
          token: 'eyJhbGciInR5cCI6IkpXVCJ9.eyJpZzA1OGE3ZTkzYzgyYyIsImlhdCI6MTY1OTYwMTU1OX0.NemTFPTtHDO23e39NYUPk8',
          uid: '6281d355ebd7058a7e93c82c',
          username: 'admin'
        }
      }
    }
  },
  {
    url: '/api/v1/getUserinfo',
    method: 'get',
    response: ({ body }) => {
      return {
        errCode: 0,
        msg: 'success',
        data: {
          token: 'eyJhbGciInR5cCI6IkpXVCJ9.eyJpZzA1OGE3ZTkzYzgyYyIsImlhdCI6MTY1OTYwMTU1OX0.NemTFPTtHDO23e39NYUPk8',
          uid: '6281d355ebd7058a7e93c82c',
          username: 'admin'
        }
      }
    }
  }
] as MockMethod[]
