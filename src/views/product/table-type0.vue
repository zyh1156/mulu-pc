<template>
  <div class="mater-ul d-flex flex-wrap">
    <mater-item
      class="mater-li"
      v-for="(pl, inx) in productList"
      :cl="pl"
      :key="inx"
    />
  </div>
</template>
<script>
import materItem from "../../components/index/mater-item";
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
  components: {
    materItem,
  },
};
</script>
<style lang="scss" scoped>
.mater-ul {
  padding: 24px 25px;
  .mater-li {
    width: 280px;
    margin: 0 10px 10px 0;
    border: 1px solid #f5f5f5;
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>