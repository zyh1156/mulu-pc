<template>
  <div class="mater-ul">
    <router-link
      :to="{ name: 'materiel', params: { materid: pl.productId } }"
      class="mater-li d-flex align-items-center"
      v-for="(pl, inx) in productList"
      :key="inx"
    >
      <!-- 收藏 -->
      <div></div>
      <!-- 图片 -->
      <div class="img-box" v-lazy:background-image="pl.coverImage"></div>
      <!-- 描述 -->
      <div class="text-box">
        <div>{{ pl.productName }}</div>
        <div>品牌：{{ pl.brandName }}</div>
        <div>
          <span>品牌性质：</span>
          <span v-if="pl.domestic == 1">国产</span>
          <span v-else>进口</span>
        </div>
        <div>店铺名称：{{ pl.shopName }}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    productList: {
      type: Array,
      default: [],
    },
  },
};
</script>
<style lang="scss" scoped>
.mater-ul {
  .mater-li {
    padding: 25px;
    border-top: #eee 1px solid;
    transform: translateY(0);
    transition: all 0.4s linear;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    background-color: #fff;
    .img-box {
      width: 160px;
      height: 120px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #eee;
      border: #eee 1px solid;
    }
    .text-box {
      padding-left: 20px;
      font-family: "aliPHM";
      font-size: 14px;
      line-height: 33px;
      & > div {
        height: 33px;
      }
    }
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 2px 24px rgba(12, 0, 51, 0.1);
    }
    &:first-child {
      border-top: none;
    }
  }
}
</style>