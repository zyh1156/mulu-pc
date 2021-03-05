<template>
  <div class="data-box max-img">
    <div v-html="comdata.shopDesc"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      comdata: (state) => state.company.comdata,
    }),
  },
};
</script>
<style lang="scss" scoped>
.data-box {
    padding: 23px;
    font: 14px/1.5 'aliPHM';
    background-color: #fff;
    border-radius: 8px;
}
</style>