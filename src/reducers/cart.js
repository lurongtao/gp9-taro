import { ADDTOCART } from '../constants/dart'

const INITIAL_STATE = {
  orders: []
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADDTOCART: 
      return {
        orders: [
          ...state.orders,
          {
            productId: action.order.productId,
            countity: 1
          }
        ]
      }
    default:
      return {
        orders: [
          {
            productId: '785855',
            countity: 1
          }
        ]
      }
  }
}
