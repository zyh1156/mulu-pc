<template>
  <router-link
    :to="{ name: 'materiel', params: { materid: cl.productId } }"
    class="recom-li"
  >
    <div
      class="collect-box d-flex justify-content-center"
      :class="{ active: cl.colleconTag == 1 }"
    >
      <div class="collect-ico">
        <span v-if="cl.colleconTag == 1">已收藏</span>
        <span v-else>收藏</span>
      </div>
    </div>
    <div
      class="recom-img d-flex align-items-center justify-content-center"
      v-lazy:background-image="cl.coverImage"
    ></div>
    <div class="recom-text">
      <div class="t0 text-truncate">
        <span>{{ cl.brandName }}&nbsp;</span>
        <span>&nbsp;{{ cl.productName }}</span>
      </div>
      <router-link
        :to="{ name: 'company', params: { companyid: cl.companyId } }"
        class="t1 text-truncate text-right"
        >{{ cl.shopName }}</router-link
      >
    </div>
  </router-link>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    cl: {
      type: Object,
      default: {},
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.recom-li {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: all 0.4s linear;
  position: relative;
  .collect-box {
    width: 76px;
    font: 14px/40px "aliPHR";
    color: #fff;
    position: absolute;
    right: 0;
    top: -40px;
    transition: all 0.4s linear;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 0 8px;
    .collect-ico {
      padding-left: 20px;
      background: left center/14px no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAABhklEQVRIS82X61ECQRCEuyPQEMhAMxAisMhAIrCMQEPACCQDuQiUCNQMJAONYKy+mqWWxx07uIjz56B2Z/rb2boeIDbCzIYArgHoeenLXwBeAcxINps5+XczU+6N55/72rvnNyRVZxVMn8xMm589sU9DxSYk9VyFmQn2KYPuqiGAMUkdCi2Ai78UJOdFBTHzfJ1Y4qUh+JEgEoDE1fJotADe8mjunOSYfucCOEWMBDAFcHsKdQCPAngL3n1N1oUArGbFaK1/AaD38SxKXmn/Uh2QMVxVKhgt0wggaiJRkb79EwHIgj9PcA3fAAbJCR8A3Nc8WkGtO5LTfBjJny8KEmtsWZBsrT8HGAAQxLHfiKWMb20apiP5SNVbcSwI3fswH+WrDvwBxJb42hXkF3uETuwU7wTQQkWITvFegEoQveJ7AX4JsVe8COBAiCLxYoAgRLF4CKAQIiQeBnAIOeZ8h21/uMm0v/dLY8uIShJ9gsox0+w4SPygDmSOqTGe/mbJXkMnT3V+ABv2qpBVnIlfAAAAAElFTkSuQmCC);
    }
    &.active {
      top: 0;
      .collect-ico {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAB8ElEQVRIS82XQU7bUBCG/9+Osy1HYFlVdWpEXrY1J0DcIJyg6gngCPQEcIOSE8Rssau4TdV1uUHYksSDnpGNIcT2cx+o2Tlv5v+/eSPPyMSzX/xxGII8BBESDB6OZQFhJMgu1DyZPM+pPsf+8JBwxqCEAHfybEgKQQSRifqdRNV4Fg+zINhZr73vIMM6Ay3WW+F470+cVuNmH1Sw6uH8EXqLikjkusujvTRd6IgcQJuvMm/amFzRpMjx/jy+0H/98NVYyPM68OpZXoSzPNAQOUDiq2lT5S+Ki+QAIMdtzcs4weVwfn1E3XM6ztRYwEKCZNkBk4E6A/jFgl4HCfnGeKBmJr3v4LI1RUSumAxGYlPUVOt/AFALgO9MyS3F3zD2VUTysyVBMxnBhKZDxMyhPloPM+YjOPP+vn0b5NZ1lrv5JIwHo1MCJzara9Iisq/7v5Kzchkl/igF8akp0ca5fv/VPM6X3uM2fB/srvte+gatuHGdu+DJNiyq0it13UP0ehBy664QVld5eQOvD7Fp/qQF1d7av4mXzbcC6AN7ENvNawHsQNSbNwL8G0SzeSuAbhDtzFsDmEG0NzcCaAdhZm4MkEPoien1LzfGtuCn696FxYRrO7I3BlGbxIePmH5UQnQ073QD5cQsIAB0qbzQuQfP8vJPjANvhQAAAABJRU5ErkJggg==);
      }
    }
    &:hover {
      color: $primary-color;
    }
  }
  .recom-img {
    height: 250px;
    overflow: hidden;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    img {
      height: 100%;
      max-width: 100%;
    }
  }
  .recom-text {
    height: 76px;
    position: relative;
    box-shadow: 0px 3px 19px rgba(0, 0, 0, 0.05);
    font-family: "aliPHM";
    .t0 {
      color: #333;
      font-size: 16px;
      line-height: 22px;
      padding: 6px 15px 8px 10px;
    }
    .t1 {
      color: #999;
      font-size: 14px;
      line-height: 20px;
      padding: 8px 15px 12px 10px;
      display: block;
      &:hover {
        color: $primary-color;
      }
    }
  }
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 3px 19px rgba(0, 0, 0, 0.05);
    .collect-box {
      top: 0;
    }
    .t0 {
      color: $primary-color;
    }
  }
}
</style>