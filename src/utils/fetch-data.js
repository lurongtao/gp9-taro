import Taro from '@tarojs/taro'

const URL = 'http://localhost:9000'

export default ({
  url = URL,
  method = 'GET',
  data = {}
}) => {
  return Taro.request({
    url,
    method,
    data,
    success: (res) => {
      return {
        data: res.data,
        header: res.header
      }
    },
    fail: (error) => {
      return error
    }
  })
}