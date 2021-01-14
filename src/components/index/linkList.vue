<template>
  <div class="link-box">
    <div class="title-box">
      <span class="cn">友情链接</span>
      <span class="en">link</span>
    </div>
    <div class="link-ul d-flex flex-wrap">
      <a
        :href="l.linkUrl"
        :title="l.linkName"
        class="link-li d-flex justify-content-center align-items-center"
        v-for="(l, inx) in links"
        :key="inx"
        target="_blank"
      >
        <img :src="l.linkLogo" :alt="l.linkName" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    links: {
      type: Array,
      default: [],
    },
  },
  watch: {
    links(newV) {
      newV.forEach((nv) => {
        if (nv.linkUrl.indexOf("http") < 0 && nv.linkUrl.indexOf("https") < 0) {
          nv.linkUrl = "http://" + nv.linkUrl;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.link-box {
    padding-bottom: 44px;
  .link-li {
    width: 130px;
    height: 80px;
    margin: 0 48.33px 20px 0;
    background-color: #fff;
    filter: grayscale(1);
    img {
      max-width: 100%;
      max-height: 100%;
    }
    &:nth-child(7n) {
      margin-right: 0;
    }
    &:hover {
      filter: grayscale(0);
    }
  }
}
</style>