<template>
  <section class="animal-bac d-flex align-items-center justify-content-center">
    <div id="particles-js"></div>
    <div class="top-bar">
      <a href="/" class="logo">
        <img src="@/assets/images/mulook-logo.png" alt="" />
      </a>
    </div>
    <router-view></router-view>
  </section>
</template>
<script>
import option from "@/libs/particles.json";
import "particles.js";
export default {
  data() {
    return {};
  },
  methods: {
    setBac() {
      particlesJS("particles-js", option);
    },
  },
  mounted() {
    // this.setBac();
  },
};
</script>
<style lang="scss" scoped>
.animal-bac {
  position: relative;
  width: 100vw;
  height: 100vh;
  #particles-js {
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
  .logo {
    position: absolute;
    top: 39px;
    left: 72px;
    img {
      height: 46px;
    }
  }
}
</style>