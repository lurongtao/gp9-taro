import Taro, { Component } from '@tarojs/taro'
import Index from './pages/'

import './app.scss'

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/detail/index"
    ],
    window: {
      navigationBarBackgroundColor: '#ee7530',
      navigationBarTitleText: '菜单',
      enablePullDownRefresh: true
    }
  }

  render() {
    return (
      <Index></Index>
    )
  }
}

export default App
