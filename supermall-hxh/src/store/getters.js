export default {
  cartLength (state) {
    return state.cartList.length
  },
  cartList (state) {
    return state.cartList
  },
  totalPrice(state) {
    const cartList = state.cartList;
    return '￥' + cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.count * item.newPrice
    }, 0)
  },
  totalCount(state) {
    const cartList = state.cartList;
    return cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.count 
    }, 0)
  },
  // overCart(state) {
  //   let cartList = state.cartList.filter(item => {
  //     return item.checked = false
  //   })
    
  // }
}