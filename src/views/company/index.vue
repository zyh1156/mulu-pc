<template>
  <div>
    <div class="top-box">
      <div
        class="container top-body d-flex justify-content-between align-items-center"
      >
        <div>
          <router-link :to="{ path: '/' }">返回首页</router-link>
        </div>
        <div>
          <router-link :to="{ path: '/' }">注册/登录</router-link>
        </div>
      </div>
    </div>
    <section class="container cont-box d-flex">
      <div class="left-box">
        <div class="fly-box">
          <div class="com-about cbox">
            <div class="ctit">公司信息</div>
            <div class="logo d-flex align-items-center justify-content-center">
              <img v-lazy="cdata.shopLogo" alt="" />
            </div>
            <div class="ctext">
              <span class="cname">企业名称</span>：
              <span class="cvalue">{{ cdata.companyName }}</span>
            </div>
            <div class="ctext">
              <span class="cname">品牌业务</span>：
              <span class="cvalue">{{ cdata.businessScope }}</span>
            </div>
            <div class="ctext">
              <span class="cname">联系方式</span>：
              <span class="cvalue"
                >{{ cdata.linkMan }}&nbsp;&nbsp;{{ cdata.linkTel }}</span
              >
            </div>
            <div class="ctext">
              <span class="cname">邮箱</span>：
              <span class="cvalue">{{ cdata.shopEmail }}</span>
            </div>
            <div class="ctext">
              <span class="cname">企业地址</span>：
              <span class="cvalue">{{ cdata.shopAddress }}</span>
            </div>
            <!-- 二维码 -->
            <div class="qrcode d-flex align-items-center">
              <img v-lazy="12" alt="" />
            </div>
            <!-- 分享 -->
            <div class="share-box d-flex justify-content-center">
              <div class="share-btn">收藏店铺</div>
              <div class="share-btn">分享店铺</div>
            </div>
          </div>
          <div class="com-classify"></div>
        </div>
      </div>
      <div class="right-box"></div>
    </section>
    <fdiv />
  </div>
</template>
<script>
import fdiv from "../../components/footer";

export default {
  data() {
    return {
      cdata: {},
    };
  },
  components: {
    fdiv,
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let comid = this.$route.params.companyid;
      this.axios
        .get("/company/get", {
          params: {
            handlerName: "shopGetHandler",
            params: { companyId: comid },
          },
        })
        .then((res) => {
          this.cdata = res.data;
          this.$store.commit("changeComdata", res.data);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.top-box {
  background-color: #fff;
  .top-body {
    font-family: "aliPHR";
    height: 40px;
  }
}
.cont-box {
  padding: 24px 0 48px;
  .left-box {
    width: 225px;
  }
  .right-box {
    width: 975px;
  }
}
.fly-box {
  .cbox {
    padding: 3px 12px 12px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    .ctit {
      font: 16px/40px "aliPHM";
      padding-left: 20px;
      background: left center/auto 12px no-repeat;
    }
  }
  .com-about {
    .ctit {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAABjElEQVRIS+2WzVHDMBCF900aCCeOhApQVgUAHUAFQCWkA6ACQgVQQlKAHKUDc+OGG1CWUSb2KBo7kU2cGWbQydbo59Pu01uBgqa1vhGRVwDDsH/Xt4gUq9Xq2lprU+eE4xD+MPOMiEZENE1dDMAjEb0ZY+5T5+wDoCzLrlIX01qLiMzbzPkHSI6A1vpORLwm1g1Abox5i4TbTwqUUsPBYPAda8E5d2KtLcr+XjWglPKnryJARLm1Nj9KBP7MLWBmIaICwD4jejHGfMQHqzOiVj7gAYCtZRqD55w7j1PYCLAR4XuNCG9DEZYAxphGCmaeeMd0znnL9m5btZ0R0FpPa67hluX2CpAixBBgU8wuAt9Y+rx3jkBbAGbOAZyV88oacTSAJuDOAOPx+DJedLFYzKMSvr4FBxdhqhX3KsIaKy7il08IwMxPAFSkgUnnFHQQ4TMRVQBENMuy7HgABxdh2wh0AmBm72zl3X0AcCoiXymbb8aMUmuBiPjHbljOP8HMFkDlXi02/vVQEVn+ABQUk4QD0LknAAAAAElFTkSuQmCC);
    }
    .logo {
      height: 70px;
      padding: 5px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .ctext {
      line-height: 1.5;
      margin-bottom: 8px;
      .cname {
        width: 50px;
        display: inline-block;
        text-align: justify;
        text-align-last: justify;
        font-family: "aliPHR";
      }
      .cvalue {
        font-family: "aliPHM";
      }
    }
    .qrcode{
      padding-top: 18px;
      min-height: 76px;
      img{
        width: 76px;
        display: block;
        margin: 0 auto;
      }
    }
    .share-box {
      padding-top: 18px;
      .share-btn {
        width: 80px;
        line-height: 28px;
        text-align: center;
        margin: 0 4px;
        color: $primary-color;
        cursor: pointer;
        font-family: "aliPHR";
        border: $primary-color 1px solid;
        &:hover {
          background-color: rgba($primary-color, 0.1);
        }
      }
    }
  }
  .com-classify {
  }
}
</style>