import Taro, { Component } from '@tarojs/taro'
import Index from './pages/'

import './app.scss'

class App extends Component {
  config = {
    pages: [
      "pages/index/index"
    ],
    window: {
      navigationBarBackgroundColor: '#6435c9'
    }
  }

  render() {
    return (
      <Index></Index>
    )
  }
}

export default App
