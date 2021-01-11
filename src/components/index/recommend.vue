<template>
  <div class="recom-box">
    <div class="d-flex justify-content-between align-items-end">
      <div class="title-box">
        <span class="cn">专属推荐</span>
        <span class="en">recommended</span>
      </div>
      <router-link
        :to="{ name: 'product' }"
        class="more"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/icon/index/more-ico@2x.png') + ')',
        }"
      >
        查看更多
      </router-link>
    </div>
    <div class="recom-ul d-flex flex-wrap">
      <mater-item
        class="recom-li"
        :cl="cl"
        v-for="(cl, inx) in comlist"
        :key="inx"
      />
    </div>
  </div>
</template>
<script>
import materItem from "./mater-item";
export default {
  data() {
    return {};
  },
  props: {
    comlist: {
      type: Array,
      default: [],
    },
  },
  components: {
    materItem,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.recom-box {
  .more {
    color: #666666;
    padding: 30px 36px 30px 30px;
    background-repeat: no-repeat;
    background-size: 22px auto;
    background-position: right 6px center;
    font: 16px/22px "aliPHR";
    transition: all 0.4s;
    &:hover {
      color: $primary-color;
      padding-right: 42px;
      background-position: right center;
    }
  }
}
.recom-ul {
  .recom-li {
    width: 380px;
    margin: 0 30px 38px 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>