import '@tarojs/async-await'
import Taro, { Component, Fragment } from '@tarojs/taro'
import { AtPagination } from 'taro-ui'
import SearchBar from '../../components/search/SearchBar'
import './menu.scss'

import fetch from '../../utils/fetch-data'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menulist: [],
      total: 0,
      q: ''
    }
    
    this.staticState = {
      _limit: 10
    }

    this.fetchData({})
    

    this.handlePageChange = this.handlePageChange.bind(this)

    // Taro.startPullDownRefresh({
    //   success() {
    //     console.log(0)
    //   }
    // })
  }

  async fetchData({_page=1, _limit=this.staticState._limit}) {
    let result = await fetch({
      url: `http://localhost:9000/data?_page=${_page}&_limit=${_limit}&q=${this.state.q}`
    })

    this.setState({
      menulist: result.data,
      total: ~~result.header['X-Total-Count']
    })
  }

  handlePageChange(type) {
    this.fetchData({ _page: type.current })
  }

  handlePageRerender(q) {
    this.setState({
      q
    })
    this.fetchData({ _page: 1 })
  }

  handleClickItem(id) {
    Taro.navigateTo({
      url: '../detail/index?id=' + id
    })
  }

  async componentWillReceiveProps(newProps) {
    if (newProps.pulling) {
      await this.fetchData({})
      this.props.onFinished()
    }
  }

  render() {
    return (
      <View>
        <SearchBar onPageRerender={this.handlePageRerender.bind(this)}></SearchBar>
        <View className="menu-list-container">
          {
            this.state.menulist.map((value, index) => {
              return (
                <View 
                  key={value.id} 
                  className="menu-list-item"
                  onClick={this.handleClickItem.bind(this, value.id)}
                >
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
            this.state.total > this.staticState._limit && <AtPagination
              icon 
              total={this.state.total}
              pageSize={this.staticState._limit}
              current={1}
              onPageChange={this.handlePageChange}
            />}
        </View>
      </View>
    )
  }
}

export default Menu