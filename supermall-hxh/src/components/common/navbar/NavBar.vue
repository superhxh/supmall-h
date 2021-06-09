<!--home首页顶部导航 购物街 （公共导航组件）-->

<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  .nav-bar {
    display: flex;
    width: 100%;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1); /* 导航下方的导航印 */
  }

  .left,
  .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
