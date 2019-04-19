import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

import Menu from '../menu/'
import Order from '../order/'
import Profile from '../profile/'

class Index extends Component {
  state = {
    current: 0
  }

  handleClick(current) {
    this.setState({
      current
    })
  }

  render() {
    return (
      <View>
        { this.state.current === 0 && <Menu /> }
        { this.state.current === 1 && <Order /> }
        { this.state.current === 2 && <Profile /> }
        <AtTabBar
          tabList={[
            { title: '菜单', image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png' },
            { title: '订单', image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png' },
            { title: '我的', image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png' }
          ]}
          fixed
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}

export default Index