import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

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
        <View>aaa</View>
        <AtTabBar
          tabList={[
            { title: '领取中心', image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png', selectedImage: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png', text: 'new' },
            { title: '找折扣', image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png' },
            { title: '领会员', image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png', text: '100', max: '99' }
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