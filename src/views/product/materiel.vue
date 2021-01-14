<template>
  <div>
    <hdiv />
    <section class="container">
      <!-- 面包屑 -->
      <div class="crumb-box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            :to="bl.url"
            v-for="(bl, inx) in breadList"
            :key="inx"
            >{{ bl.text }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <!-- 物料介绍 -->
      <div class="mater-intro d-flex align-items-center">
        <div class="left-box">
          <!-- 大图 -->
          <div class="big-box">
            <div
              class="d-flex big-img align-items-center"
              :style="{ transform: 'translateX(' + -100 * introInx + '%)' }"
            >
              <div
                class="b-li"
                v-for="(mpl, inx) in mater.proImgLists"
                :key="inx"
              >
                <img v-lazy="mpl.ossPath" alt="" />
              </div>
              <div class="b-li" v-show="mater.proImgLists.length == 0">
                <img v-lazy="mater.coverImage" alt="" />
              </div>
            </div>
          </div>
          <!-- 列表图 -->
          <div
            v-show="mater.proImgLists.length != 0"
            class="small-img d-flex align-items-center justify-content-center"
          >
            <div
              class="left-ico"
              @click="switchImg(true)"
              :style="{
                backgroundImage:
                  'url(' + require('@/assets/icon/product/left-ico.png') + ')',
              }"
            ></div>
            <div class="s-ul d-flex align-items-center justify-content-center">
              <div
                class="s-li"
                :class="{ active: introInx == inx }"
                @click="introInx = inx"
                v-for="(mpl, inx) in mater.proImgLists"
                v-lazy:background-image="mpl.url"
                :key="inx"
              ></div>
            </div>
            <div
              class="right-ico"
              @click="switchImg(false)"
              :style="{
                backgroundImage:
                  'url(' + require('@/assets/icon/product/right-ico.png') + ')',
              }"
            ></div>
          </div>
        </div>
        <div class="right-box">
          <div class="mater-name">{{ mater.productName }}</div>
          <mattr :mater="mater" />
          <div class="mater-btns">
            <el-button type="primary" class="mbtn">产品入库</el-button>
            <el-button class="mbtn">收藏产品</el-button>
          </div>
        </div>
      </div>
      <!-- 物料详情 -->
      <div class="mater-detail">
        <div class="header d-flex justify-content-between align-items-center">
          <div class="tit">产品详情</div>
          <router-link
            :to="{ name: 'company', params: { companyid: mater.shopId } }"
            tag="a"
            target="_blank"
            class="about-shop d-flex"
          >
            <div class="d-flex align-items-center">
              <div
                class="shop-logo"
                v-lazy:background-image="mater.shopLogo"
              ></div>
              <div class="shop-text">
                <div style="font-size: 14px">{{ mater.shopName }}</div>
                <div style="font-size: 12px"></div>
              </div>
            </div>
            <el-button size="mini " type="primary" class="mbtn">进入</el-button>
          </router-link>
        </div>
        <div class="body">
          <div v-for="(dl, inx) in descList" :key="inx">
            <img v-lazy="dl" alt="" />
          </div>
          <div v-if="descList.length == 0" class="search-status">
            <div class="img"></div>
          </div>
        </div>
      </div>
    </section>
    <fdiv />
  </div>
</template>
<script>
import mattr from "./mater-attr";
import hdiv from "@/components/header";
import fdiv from "@/components/footer";
export default {
  data() {
    return {
      breadList: [
        {
          url: { path: "/" },
          text: "首页",
        },
        {
          url: {
            name: "product",
          },
          text: "产品",
        },
      ],
      mater: {
        shopId:'0',
        proImgLists: [],
      },
      introInx: 0,
      attrList: [],
      descList: [],
    };
  },
  components: {
    hdiv,
    fdiv,
    mattr,
  },
  mounted() {
    document.querySelector("body").style.backgroundColor = "#fff";
    this.getData();
  },
  methods: {
    switchImg(flag) {
      if (flag) {
        if (this.introInx > 0) this.introInx--;
      } else {
        if (this.introInx < this.mater.proImgLists.length - 1) this.introInx++;
      }
    },
    setBread(data) {
      this.breadList.push(
        {
          url: {
            name: "product",
            query: {
              categoryId1: data.categoryId1,
            },
          },
          text: data.categoryName1,
        },
        {
          url: {
            name: "product",
            query: {
              categoryId1: data.categoryId1,
              categoryId2: data.categoryId2,
            },
          },
          text: data.categoryName2,
        },
        {
          text: data.productName,
        }
      );
    },
    getData() {
      let id = this.$route.params.materid;
      this.axios
        .get("/product/get", {
          params: {
            handlerName: "productGetHandler",
            params: { productId: id },
          },
        })
        .then((res) => {
          this.mater = res.data;
          this.attrList = JSON.parse(res.data.allSpec);
          if (res.data.productDesc.trim() != "") {
            this.descList = res.data.productDesc.split(",");
          }
          console.log(this.descList);
          this.setBread(res.data);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.mater-intro {
  padding: 0 40px 20px;
  .left-box {
    width: 620px;
    .big-box {
      overflow: hidden;
      border: #eee 1px solid;
      background-color: #eee;
      .big-img {
        height: 430px;
        transition: all 0.4s;
        .b-li {
          width: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .small-img {
      padding-top: 16px;
      .left-ico,
      .right-ico {
        width: 37px;
        height: 37px;
        background-size: 37px;
        cursor: pointer;
      }
      .s-ul {
        padding: 0 30px;
        min-width: 320px;
        .s-li {
          width: 70px;
          height: 70px;
          margin: 0 7px;
          background-color: #eee;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          border: #eee 1px solid;
          cursor: pointer;
          &.active {
            border-color: #7a7a7a;
          }
        }
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .right-box {
    padding-left: 100px;
    width: 580px;
    .mater-name {
      font: 20px/27px "aliPHM";
    }
    .mater-btns {
      margin-top: 40px;
      .mbtn {
        width: 172px;
        height: 46px;
        & + .mbtn {
          margin-left: 16px;
        }
      }
    }
  }
}
.mater-detail {
  margin-top: 70px;
  .header {
    height: 45px;
    background: linear-gradient(to right, #e7e7e7, #fff);
    .tit {
      padding-left: 37px;
      font-size: 14px;
    }
    .about-shop {
      padding-left: 45px;
      .shop-logo {
        width: 30px;
        height: 30px;
        background-size: cover;
      }
      .shop-text {
        line-height: 1.5;
        margin: 0 45px 0 10px;
      }
    }
  }
  .body {
    padding-bottom: 1rem;
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      margin: 1rem auto;
    }
  }
}
</style>