<template>
  <div>
    <!-- 排序方式 -->
    <div class="order-ul d-flex">
      <div
        class="order-li"
        :class="{ active: search.order == sl.value }"
        v-for="(sl, inx) in orderList"
        :key="inx"
        @click="setOrder(sl.value)"
      >
        <span>{{ sl.name }}</span>
      </div>
    </div>
    <!-- 产品列表 -->
    <div class="pro-ul d-flex flex-wrap">
      <router-link
        :to="{ name: 'materiel', params: { materid: pl.productId } }"
        class="pro-li"
        v-for="(pl, inx) in productList"
        :key="inx"
      >
        <div class="img-box">
          <div class="img-body" v-lazy:background-image="pl.coverImage"></div>
        </div>
        <div class="txt-box text-truncate">{{ pl.productName }}</div>
      </router-link>
    </div>
    <div class="search-status">
      <div v-if="searchBox.nosearch" class="img"></div>
      <div v-else class="text">
        <span v-if="searchBox.status == 2">我是有底线的</span>
        <span v-else class="el-icon-loading"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        sort: "desc",
        order: "sort",
        limit: 16,
        page: 1,
        params: {
          shopId: "",
          groupId: "",
        },
        handlerName: "webProductListHandler",
      },
      searchBox: {
        status: 0,
        page: 0,
        nosearch: false,
      },
      orderList: [
        { name: "综合排序", value: "sort" },
        { name: "推荐", value: "count" },
        { name: "新品", value: "product.updateTime" },
      ],
      productList: [],
    };
  },
  mounted() {
    let comid = this.$route.params.companyid;
    this.search.params.shopId = comid;
    this.refreData();
    this.toSee();
  },
  watch: {
    "$store.state.company.groupId"(newV) {
      this.search.params.groupId = newV;
      this.refreData();
    },
  },
  methods: {
    toSee() {
      let div = document.querySelector("html"),
        scrollTop,
        scrollHeight,
        height,
        div2 = document.querySelector(".pro-ul");
      window.addEventListener("scroll", () => {
        scrollTop = div.scrollTop;
        scrollHeight = div2.scrollHeight;
        height = window.innerHeight;
        if (scrollTop + height > scrollHeight + 200) {
          this.loadmore();
        }
      });
    },
    loadmore() {
      if (
        this.search.page < this.searchBox.page &&
        this.searchBox.status == 2
      ) {
        this.search.page++;
        this.getData();
      }
    },
    refreData() {
      this.search.page = 1;
      this.productList = [];
      this.getData();
    },
    setOrder(order) {
      this.search.order = order;
      this.refreData();
      console.log(this.$store);
    },
    getData() {
      this.searchBox.status = 1;
      let arr = this.productList;
      this.axios.get("/product/page", { params: this.search }).then((res) => {
        this.searchBox = {
          status: 2,
          page: res.data.pages,
          nosearch: res.data.records.length == 0,
        };
        this.productList = arr.concat(res.data.records);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.order-ul {
  padding: 0 20px;
  background-color: #fff;
  border-radius: 8px;
  .order-li {
    cursor: pointer;
    font: 16px/22px "aliPHR";
    padding: 19px 50px;
    span {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 44px;
        bottom: -19px;
        left: calc(50% - 22px);
        border-bottom: transparent 3px solid;
        box-shadow: 0 0 0 transparent;
        transition: all 0.4s linear;
      }
    }
    &.active {
      color: $primary-color;
      font-family: "aliPHM";
      span {
        &::after {
          border-bottom-color: $primary-color;
          box-shadow: 0px 3px 6px $primary-color;
        }
      }
    }
    &:first-child {
      padding-left: 0;
    }
    &:hover {
      color: $primary-color;
    }
  }
}
.pro-ul {
  padding-top: 20px;
  .pro-li {
    background-color: #fff;
    border-radius: 0 0 8px 8px;
    width: 230px;
    margin: 0 18.33px 20px 0;
    font: 14px/20px "aliPHR";
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transform: translateY(0) translate3d(0, 0, 0);
    transition: all 0.2s linear;
    .img-box {
      width: 230px;
      overflow: hidden;
      .img-body {
        height: 178px;
        background: center/cover no-repeat;
        transform: scale(1) translate3d(0, 0, 0);
        transition: all 0.2s linear;
      }
    }
    .txt-box {
      height: 38px;
      padding: 9px;
      line-height: 20px;
    }
    &:hover {
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px) translate3d(0, 0, 0);
      .img-body {
        transform: scale(1.1) translate3d(0, 0, 0);
      }
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>