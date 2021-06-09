<template>
  <div>
    <router-view v-slot="{ Component }">
<!-- keep-alive     会缓存不活动的组件实例，而不是销毁它们-->
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabBar/MainTabBar'
import Icon from '@/components/content/Icon/Icon.vue'
import SvgIcon from '@/components/content/Icon/svg.vue'
export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
};
</script>

<style>
  @import "./assets/css/base.css";
</style>
