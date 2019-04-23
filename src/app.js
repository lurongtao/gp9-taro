import Taro, { Component } from '@tarojs/taro'
import Index from './pages/'

import { Provider } from '@tarojs/redux'
import configStore from './store/'
import './app.scss'

const store = configStore()

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
      <Provider store={store}>
        <Index></Index>
      </Provider>
    )
  }
}

export default App
