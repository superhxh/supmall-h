<template>
  <div id="home" class="wrapper">
    <!-- 首页顶部导航栏 -->
    <nav-bar class="home-nav"><template #center>购物街</template></nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" :key="home_swiper" />
    <!-- 四个促销组件 -->
    <home-recommend-view :recommends="recommends" />
    <!-- 本周流行（img） -->
    <feature-view />
    <!--三个切换模块 狸猫换太子，实现吸附效果 -->
    <tab-control
    :titles="titles"
    @tabClick="tabClick"
    ref="tabControl2"
    v-show="isTabShow"
    />
    <!-- Scroll添加滚动 -->
    <scroll
    class="content"
    ref="scroll"
    :probe-type="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
    :observeImage="true"
    >
      <!-- 分类导航栏 -->
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="!isTabShow"
      />
      <!-- 商品展示 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click="backClick" v-show="isBackShow" />
    <!--当需要监听一个组件的原生事件时，必须给对应的事件加上native修饰符才可以进行监听-->
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";

//面向getMultidata发送网络请求 从公共的request中请求
import { getHomeMultidata, getHomeGoods } from "@/network/home";

import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll.vue";
import {backTopMixin} from '@/common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin],

  //data用于存储请求过来的数据 通过两个变量保存请求完后要被回收掉的res
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],

      //对流行 新款 精选 进行数据结构管理
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabControlTop: null,
      isTabShow: false,
      saveY: 0,
      home_swiper : 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

//创建组件生命周期函数设置发送网络请求的时间
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据pop news sell
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // 回到定位位置
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  // 记录离开首页此时的高度
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  mounted() {
    setTimeout(() => {
      this.forceRerender()
    },400)
  },
  methods: {
    /**
     * 关于事件监听的方法
     *
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position){
      // 1.确定BackTop是否显示
      this.isBackShow = (-position.y) > 1000

      // 2.确定TabControl是否吸顶
      this.isTabShow = (-position.y) > this.tabControlTop - 44
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      //所有的组件都有一个属性￥el:用于获取组件中的元素
      this.tabControlTop = this.$refs.tabControl1.$el.offsetTop
    },
    forceRerender() {
      this.home_swiper += 1;
    },

    //关于网络请求相关的方法
    getHomeMultidata() {
      //  请求多个数据
      getHomeMultidata().then((res) => {
        //先调用函数 再通过.then拿到请求到的数据
        //res拿到请求结果
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        //  res变量 指向大量数据  ...res指向多个数据
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;     //获取页码
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);  //对type数据进行解析 然后将请求到的data.list里面的东西存入数组当中
        this.goods[type].page += 1;      //得到一波（30个）数据后 页码+1
        this.$refs.scroll.finishPullUp()
        // console.log(this.goods[type].list);
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  /* 为了在使用原生滚动时，导航栏不随着内容滚动 */
  /* position: fixed;            粘性定位 基于用户的滚动位置来定位
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.content {
  overflow: hidden;
  height: calc(100% - 84px);
}
</style>
