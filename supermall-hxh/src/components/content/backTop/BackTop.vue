<!--点击回到顶部的箭头按钮-->

<template>
  <div class="back-top">
    <img src="../../../assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 55px;
    right: 5px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
