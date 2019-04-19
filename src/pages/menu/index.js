import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { AtPagination } from 'taro-ui'
import './menu.scss'

import fetch from '../../utils/fetch-data'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menulist: [],
      total: 0
    }

    this.fetchData({})

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  async fetchData({_page=1, _limit=10}) {
    let result = await fetch({
      url: `http://localhost:9000/data?_page=${_page}&_limit=${_limit}`
    })

    this.setState({
      menulist: result.data,
      total: ~~result.header['X-Total-Count']
    })
  }

  handlePageChange(type) {
    this.fetchData({ _page: type.current })
  }

  render() {
    console.log(this.state.total)
    return (
      <View className="menu-list-container">
        {
          this.state.menulist.map((value, index) => {
            return (
              <View key={value.id} className="menu-list-item">
                <View className="imgBox">
                  <image mode="aspectFit" src={value.img}></image>
                </View>
                <View className="title">
                  <Text>{value.name}</Text>
                </View>
                <View className="subtitle">
                  <Text>点击：{value.all_click} 收藏：{value.favorites}</Text>
                </View>
              </View>
            )
          })
        }
        {
          // AtPagination 组件的total属性第一次渲染有效
          // 所以加个判断
          this.state.total > 0 && <AtPagination
            icon 
            total={this.state.total}
            pageSize={10}
            current={1}
            onPageChange={this.handlePageChange}
          />}
      </View>
    )
  }
}

export default Menu