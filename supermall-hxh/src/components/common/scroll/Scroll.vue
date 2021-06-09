<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    observeDOM: {
      type: Boolean,
      default: false,
    },
    observeImage: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      mouseWheel: true,
      observeDOM: this.observeDOM,
      // 等到页面图片加载完之后，刷新content高度
      observeImage: this.observeImage,
      // 派发scroll事件
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    console.log(this.scroll);
    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (positon) => {
        this.$emit("scroll", positon);
      });
    }

    // 监听下拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20)
    }
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
}
</script>

<style>
</style>
