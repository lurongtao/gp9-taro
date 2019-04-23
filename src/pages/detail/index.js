import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtBadge } from 'taro-ui'
import { connect } from '@tarojs/redux'
import fetch from '../../utils/fetch-data'
import './swiper.scss'

import menu from '../../assets/images/edit.png'

const mapState = (state) => {
  return {
    orders: state.cart.orders
  }
}

@connect(mapState, null)
class Detail extends Component {
  config = {
    navigationBarTitleText: 'loading...'
  }

  state = {
    swiperList: [],
    detail: {}
  }

  constructor(props) {
    super(props)

    this.swiperList = []
  }

  async fetchData() {
    let result = await fetch({
      url: 'http://localhost:9001/data'
    })

    Taro.setNavigationBarTitle({
      title: result.data.name
    })
      
    let swiperList = [result.data.img, ...result.data.makes.map(make => make.img)]
    this.setState({
      swiperList,
      detail: result.data,
      current: 0
    })
  }
  
  componentWillMount() {
    this.productId = this.$router.params.id
    this.fetchData()
  }

  handleClick(current) {
    this.setState({
      current
    })
  }

  makeTabs(makes) {
    let mapArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
    return makes.map((value) => {
      return {
        title: '步骤' + mapArr[~~value.num - 1]
      }
    })
  }

  render() {
    let { info, health_str, makes } = this.state.detail
    let order = this.props.orders.find((item) => item.productId === this.productId)
    return (
      <View className="detail-container">
        <View className="swiper">
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
          >
          {
            this.state.swiperList.map((item, index) => (
              <SwiperItem key={index}>
                <View>
                  <Image src={item}></Image>
                </View>
              </SwiperItem>
            ))
          }
          </Swiper>
        </View>
        <View className="info">
          <Text>{info}</Text>
        </View>
        <View className="health-str">
          <View>食材：</View>
          <Text>{health_str}</Text>
        </View>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={this.makeTabs(makes)}
          onClick={this.handleClick.bind(this)}>
          {
            makes.map((value, index) => (
              <AtTabsPane 
                current={this.state.current} 
                index={index}
                key={value.num}
              >
                <View className="tab-item">
                  <View>
                    <Image src={value.img}></Image>
                  </View>
                  <View>
                    <Text>{value.info}</Text>
                  </View>
                </View>
              </AtTabsPane>
            ))
          }
        </AtTabs>
        <View className="cart-box">
          <View className="cart">
            <AtBadge value={order.countity} maxValue={99}>
              <Image src={menu}></Image>
            </AtBadge>
            <Text>订单</Text>
          </View>
          <View className="button">
            <View>确认购买</View>
            <View>立即支付</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Detail