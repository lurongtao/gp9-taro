import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import fetch from '../../utils/fetch-data'
import './swiper.scss'
class Detail extends Component {
  config = {
    navigationBarTitleText: 'loading...'
  }

  state = {
    swiperList: []
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
      swiperList
    })
  }
  
  componentWillMount() {
    console.log(this.$router.params.id)
    this.fetchData()
  }

  render() {
    return (
      <View class="swiper-container">
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
    )
  }
}

export default Detail