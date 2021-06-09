import { createStore } from 'vuex'
import getters from './getters';
import mutations from './mutations'
import actions from './actions'

// 创建 store 容器实例.
const store = createStore({
  state () {
    return {
      cartList : []
    }
  },
  getters,
  mutations,
  actions
})

export default store