<template>
  <nav-bar class="nav-bar">
      <template #left>
        <img
          src="../../../assets/img/common/back.svg"
          alt=""
          @click="backClick"
          class="back"
        />
      </template>
      <template #center>
        <span
          v-for="(item, index) in titles"
          :key="index"
          @click="itemClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </span>
      </template>
    </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  data () {
    return {
      currentIndex: 0,
      titles: ["商品", "参数", "评论", "推荐"]
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index )
    },
    backClick() {
      this.$router.back();
    },
  }
}
</script>

<style scoped>
.nav-bar {
  font-size: 13px;
}
.nav-bar span {
  padding: 0 10px;
}
.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 10px;
}
</style>