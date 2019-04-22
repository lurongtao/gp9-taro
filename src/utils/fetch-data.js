import Taro from '@tarojs/taro'

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