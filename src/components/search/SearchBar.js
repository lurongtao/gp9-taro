import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import _ from 'lodash'
class SearchBar extends Component {
  state = {
    value: ''
  }

  // onChange = _.debounce(() => {
  //   // 没有 action 按钮情况下使用
  // }, 300)

  onChange(value) {
    this.setState({
      value
    })
  }

  onActionClick() {
    this.props.onPageRerender(this.state.value)
  }

  render() {
    return (
      <AtSearchBar
        showActionButton
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
    )
  }
}

export default SearchBar