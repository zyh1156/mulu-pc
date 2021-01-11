<template>
  <div>
    <hdiv />
    <router-view class="container" />
    <fdiv />
  </div>
</template>
<script>
import hdiv from "@/components//header";
import fdiv from "@/components/footer";
export default {
  data() {
    return {};
  },
  components: {
    hdiv,
    fdiv,
  },
};
</script>
<style lang="scss" scoped>
</style>