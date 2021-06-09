<!--底部导航主要内容设计（首页，分类 ，购物车，我的）-->

<template>
  <div>
    <tab-bar>
      <template #default>
        <tab-bar-item path="/home">
          <template #item-icon>
            <img src="@/assets/img/tabbar/home.svg" />
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/home_active.svg" />
          </template>
          <template #item-text><div>首页</div></template>
        </tab-bar-item>
        <tab-bar-item path="/category">
          <template #item-icon>
            <img src="@/assets/img/tabbar/category.svg" />
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/category_active.svg" />
          </template>
          <template #item-text><div>分类</div></template>
        </tab-bar-item>
        <tab-bar-item path="/shopcart">
          <template #item-icon>
            <img src="@/assets/img/tabbar/shopcart.svg" />
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/shopcart_active.svg" />
          </template>
          <template #item-text><div>购物车</div></template>
        </tab-bar-item>
        <tab-bar-item path="/profile">
          <template #item-icon>
            <img src="@/assets/img/tabbar/profile.svg"/>
          </template>
          <template #item-icon-active>
            <img src="@/assets/img/tabbar/profile_active.svg"/>
          </template>
          <template #item-text><div>我的</div></template>
        </tab-bar-item>
      </template>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style></style>
