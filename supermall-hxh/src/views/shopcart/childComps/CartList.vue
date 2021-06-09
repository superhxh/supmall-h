<template>
  <div class="cart-list">
    <scroll class="content"
            :probeType="3"
            ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll';
import CartListItem from './CartListItem';
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    cartList() {
      return this.$store.state.cartList
    }
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  overflow: hidden;
  margin-top: 44px;
  height: calc(100% - 133px);
}
</style>