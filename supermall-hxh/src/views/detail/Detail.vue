<template>
  <div class="detail">
    <!-- 详情页顶部导航 -->
    <detail-nav-bar class="detail-nav" @tabClick="tabClick" ref="nav"/>
    <!-- 滚动 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :observeImage="true"
      :observeDOM="true"
      @scroll="contentScroll" >
      <!-- 详情页轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goods" />
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shopInfo" />
      <!-- 图片展示 -->
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
        class="goods-info"
      />
      <!-- 尺码信息 -->
      <detail-param-info :param-info="paramInfo" ref="params" />
      <!-- 评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 推荐 -->
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <!-- 底部导航 -->
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart" />
    <!-- 回到顶部按钮 -->
    <back-top @click="backClick" v-show="isBackShow" class="back-top" />
    <!-- 弹窗 -->
    <toast :message="message" :isShow="isShow" />
  </div>
</template>

<script>
import { getDetail, Goods, GoodsParam, getRecommend } from "@/network/detail";
import { debounce } from "@/common/utils";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import {backTopMixin} from '@/common/mixin';
import Toast from '@/components/common/toast/Toast'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [], // 记录滚动y轴坐标
      getThemeTopY: null, // 防抖函数
      currentIndex: 0,
      product: {},
      isShow: false,
      message: '',
      detail_nav: 0
    };
  },
  mixins: [backTopMixin],
  components: {
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    DetailGoodsInfo,
    GoodsList,
    DetailNavBar,
    DetailBottomBar,
    Toast,
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.获取详情页数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // console.log(data);
      // 1.获取顶部的图片详情数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息
      this.shopInfo = data.shopInfo;
      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.获取推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    this.$nextTick(() => {
      this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE); // 存入最大值，用于边界条件判断
      console.log(this.themeTopYs);
    }, 200);
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // console.log("------------------------");
      this.getThemeTopY();
    },
    tabClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // 判断做法、 hack
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i; // 用于避免重复记录i的次数
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 2.确定BackTop是否显示
      this.isBackShow = (-position.y) > 1000
    },
    addToCart () {
      this.product.iid = this.iid
      this.product.img = this.topImages[0]
      this.product.title = this.goods.title
      this.product.desc = this.goods.desc
      this.product.newPrice = this.goods.realPrice
      // 添加到购物车
      this.$store.dispatch('addCart',this.product).then(res =>{
        console.log(res);
        this.message = res;
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        },1500)
      })
      // console.log(this.$store.state.cartList);
    }
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail .goods-info {
  position: relative;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
  font-weight: 700;
}
.content {
  height: calc(100% - 102px);
  overflow: hidden;
}
.bottom-bar {
  position: relative;
}
</style>