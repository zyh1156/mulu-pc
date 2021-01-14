<template>
  <div>
    <hdiv />
    <section class="container">
      <!-- 面包屑 -->
      <div class="crumb-box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/product' }"
            >产品</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <!-- 筛选框 -->
      <div class="classify-box">
        <!-- 一级分类 -->
        <div class="d-flex">
          <div class="cl-tit">一级分类：</div>
          <div class="cl-ul d-flex flex-wrap">
            <div
              class="cl-li"
              :class="{ active: search.params.categoryId1 == fl.categoryId }"
              @click="getSecond(fl.categoryId)"
              v-for="(fl, inx) in firstList"
              :key="inx"
            >
              {{ fl.categoryName }}
            </div>
          </div>
        </div>
        <div
          v-show="secondList.length"
          :class="{ active: showSecond }"
          class="d-flex align-items-start justify-content-between second"
        >
          <div>
            <!-- 二级分类 -->
            <div class="d-flex">
              <div class="cl-tit">二级分类：</div>
              <div class="cl-ul d-flex flex-wrap">
                <div
                  class="cl-li"
                  :class="{
                    active: search.params.categoryId2 == sl.categoryId,
                  }"
                  @click="getSpecs(sl.categoryId)"
                  v-for="(sl, inx) in secondList"
                  :key="inx"
                >
                  {{ sl.categoryName }}
                </div>
              </div>
            </div>
            <!-- 规格分类 -->
            <div class="d-flex" v-for="(sl, inx) in specsList" :key="inx">
              <div class="cl-tit">{{ sl.k }}：</div>
              <div class="cl-ul d-flex flex-wrap">
                <div
                  class="cl-li"
                  @click="setSpecs(sp.name, inx)"
                  :class="{
                    active:
                      search.params.specTitle1 == sp.name ||
                      search.params.specTitle2 == sp.name ||
                      search.params.specTitle3 == sp.name ||
                      search.params.specTitle0 == sp.name,
                  }"
                  v-for="(sp, inx2) in sl.options"
                  :key="inx2"
                >
                  {{ sp.name }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="close-classify"
            :class="{ active: !showSecond }"
            @click="showSecond = !showSecond"
          >
            <span v-if="showSecond">收起筛选</span>
            <span v-else>展开筛选</span>
          </div>
        </div>
      </div>
      <!-- 物料列表 -->
      <div class="mater-box">
        <div class="mater-header d-flex justify-content-between">
          <div class="d-flex sort-ul align-items-center">
            <div
              class="sort-li"
              :class="{
                active: search.order == sl.value,
                'arrow-ico': sl.value == 'productPrice',
                'asc-mode': search.sort == 'asc',
              }"
              v-for="(sl, inx) in sortList"
              @click="cSearch(sl.value)"
              :key="inx"
            >
              {{ sl.name }}
            </div>
          </div>
          <!-- 样式切换 -->
          <div class="d-flex align-items-center">
            <div
              class="row-ico"
              :class="{ active: tableType }"
              @click="tableType = true"
            ></div>
            <div
              class="col-ico"
              :class="{ active: !tableType }"
              @click="tableType = false"
            ></div>
          </div>
        </div>
        <type0 :productList="productList" v-show="tableType" />
        <type1 :productList="productList" v-show="!tableType" />
        <div class="search-status">
          <div v-if="searchBox.nosearch" class="img"></div>
          <div v-else class="text">
            <span v-if="searchBox.status == 2">我是有底线的</span>
            <span v-else class="el-icon-loading"></span>
          </div>
        </div>
      </div>
    </section>
    <fdiv />
  </div>
</template>
<script>
import hdiv from "@/components/header";
import fdiv from "@/components/footer";
import type0 from "./table-type0";
import type1 from "./table-type1";
export default {
  data() {
    return {
      productList: [],
      firstList: [],
      showSecond: false,
      tableType: true,
      secondList: [],
      specsList: [],
      sortInx: 0,
      sortList: [
        { name: "综合排序", value: "sort" },
        { name: "热门", value: "count" },
        { name: "最新", value: "product.updateTime" },
        { name: "价格", value: "productPrice" },
      ],
      search: {
        params: {
          categoryId1: "",
          categoryId2: "",
          specTitle1: "",
          specTitle2: "",
          specTitle3: "",
          specTitle0: "",
          specTitleLength: 4,
        },
        limit: 12,
        page: 0,
        sort: "desc",
        order: "sort",
        handlerName: "webProductListHandler",
      },
      searchBox: {
        status: 0,
        page: 0,
        nosearch: false,
      },
    };
  },
  components: {
    hdiv,
    fdiv,
    type0,
    type1,
  },
  mounted() {
    this.callData();
    this.getFirst();
    this.getData();
    this.toSee();
  },
  methods: {
    callData() {
      let id1 = this.$route.query.categoryId1,
        id2 = this.$route.query.categoryId2;
      if (id1) {
        this.getSecond(id1);
      }
      this.search.params.categoryId1 = id1 || "";
      this.search.params.categoryId2 = id2 || "";
      this.getData();
    },
    cSearch(val) {
      if (val == "productPrice") {
        this.search.sort = this.search.sort == "desc" ? "asc" : "desc";
      } else if (this.search.order != val) {
        this.search.sort = "desc";
      } else {
        return;
      }
      this.search.order = val;
      this.refreData();
    },
    toSee() {
      let div = document.querySelector("html"),
        scrollTop,
        scrollHeight,
        height;
      window.addEventListener("scroll", () => {
        scrollTop = div.scrollTop;
        scrollHeight = div.scrollHeight;
        height = window.innerHeight;
        if (scrollTop + height > scrollHeight - 275) {
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
    setSpecs(name, inx) {
      let stxt = "specTitle" + inx;
      this.search.params[stxt] = name;
      this.refreData();
    },
    refreData() {
      this.search.page = 1;
      this.productList = [];
      this.getData();
    },
    getData() {
      this.searchBox.status = 1;
      let arr = this.productList;
      let data = this.search;
      this.axios
        .get("/product/page", { params: this.search }, { Authorization: "" })
        .then((res) => {
          this.searchBox = {
            status: 2,
            page: res.data.pages,
            nosearch: res.data.records.length == 0,
          };
          this.productList = arr.concat(res.data.records);
        });
    },
    getFirst() {
      this.axios({
        url: "/product/category/first",
        headers: { Authorization: "" },
      }).then((res) => {
        res.data.unshift({
          categoryName: "全部",
          categoryId: "",
        });
        this.firstList = res.data;
      });
    },
    getSecond(id) {
      this.search.params.categoryId1 = id;
      this.search.params.categoryId2 = "";
      this.search.params.specTitleLength = 0;
      this.showSecond = true;
      this.refreData();
      if (id == "") {
        this.secondList = [];
        return;
      }
      this.axios({
        url: "/product/category/second",
        params: {
          handlerName: "secondCategoryHandler",
          params: {
            categoryId: id,
          },
        },
        headers: { Authorization: "" },
      }).then((res) => {
        res.data.unshift({
          categoryName: "全部",
          categoryId: "",
        });
        this.secondList = res.data;
        this.specsList = [];
      });
    },
    getSpecs(id) {
      this.search.params.categoryId2 = id;
      this.search.params.specTitle1 = "";
      this.search.params.specTitle2 = "";
      this.search.params.specTitle3 = "";
      this.search.params.specTitle0 = "";
      this.search.params.specTitleLength = 0;
      this.showSecond = true;
      this.refreData();
      if (id == "") {
        this.specsList = [];
        return;
      }
      this.axios({
        url: "/specscategory/getSpecsCategory",
        params: {
          categoryId: id,
        },
        headers: { Authorization: "" },
      }).then((res) => {
        let arr = [],
          leng = 0,
          obj = JSON.parse(res.data.specifications)[0];
        if (obj) {
          obj.params.forEach((ele) => {
            if (ele.searchable && ele.options.length > 0) {
              leng++;
              ele.options.unshift({
                name: "全部",
                value: "",
              });
              arr.push(ele);
            }
          });
        }
        this.specsList = arr;
        this.search.params.specTitleLength = leng;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color";
.classify-box {
  padding: 14px 34px;
  background: #fff;
  border-radius: 8px;
  font: 12px/17px "aliPHM";
  .cl-tit {
    padding: 10px 0;
    width: 60px;
    flex-shrink: 0;
    white-space: nowrap;
    font-weight: bold;
  }
  .cl-ul {
    padding-left: 20px;
    .cl-li {
      cursor: pointer;
      padding: 10px 12px;
      &.active {
        color: $primary-color;
      }
    }
  }
  .second {
    max-height: 37px;
    transition: all 0.4s linear;
    overflow: hidden;
    &.active {
      max-height: 185px;
    }
  }
  .close-classify {
    padding: 10px 18px 10px 12px;
    white-space: nowrap;
    color: $primary-color;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 10px;
      right: 0;
      width: 10px;
      height: 17px;
      transform: rotate(0deg);
      transition: all 0.4s;
      background: center/10px auto no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAABK0lEQVQ4T52SvU0DQRCF37uTnSFfCXRgnBGeO6ADzpJ3UygBOoDM2gk4KoAOfGRkmA4owUhEdjBorD3LmPtBTLDS7sz7Znf2ET3hnDsD8BrLzkVk1SVhVzLClgAyklDVdZqmk8Vi8dGmawUWRZENh8M3AKcAvlRVSZ6o6mq73U7Lslw3QRuBBhsMBkuS9txPVc1NTLICMOqCNgK99zansUFUdVLPzXt/AeApnlciMj2+5S+g974EcBlFMxGx/T6ccwXJh5gvRWR2mP8B7IPVwi7oHnhUdC8i1z0OuCN5FWtuQwg3uznbcggD8BhCKPr8afmmF3E+n+dJkpjX7ANeRGT3o3+NYyi99+anEYD3zWaTt/mrrUH0q9lpbManc64imf0HVjeJvn0GsPoGxfahebB8hawAAAAASUVORK5CYII=);
    }
    &.active {
      &::after {
        transform: rotate(180deg);
      }
    }
  }
}
.mater-header {
  border-bottom: #eee 1px solid;
  padding-right: 24px;
  .sort-ul {
    .sort-li {
      font: 14px/39px "aliPHM";
      padding: 0 24px;
      position: relative;
      cursor: pointer;
      &.arrow-ico {
        position: relative;
        padding-right: 32px;
        &::before {
          content: "";
          position: absolute;
          width: 10px;
          height: 6px;
          top: 17px;
          right: 19px;
          transform: rotate(0deg);
          transition: all 0.4s linear;
          background: center/10px auto no-repeat;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAABEUlEQVQ4T53SwVHCQBQG4P8PZ8eUQAc+w4GjSQlUIHRgB1qCVmDswA6AIwcyzxLsIHhPnrPZlQGzZIC9ZCZ579t/N48i2SvAO6CZqWqNK5aIpMBoCaCm3E8ccguDAk1xKbrHCAGwo0g2B/neBTMrVavFJSFFshXIB9/fFHTPa1GRSQniMYRZqFZlBwb0BeRz+PimWj0NJY1hrn4PerS/Yww9PhE+VLfzv7oj8Bx0COslPDj+wUVjprr99JtJDnbj4X7gWrXK/5+glzA0pmCy6ubTrAbawjcmS5ApYF+wNo+NWBSMoD9mIBPeAPYNa+XUvJ4EAzoGR+oH3wByB2tcMvcuugbBgIoh2fgLb6dDmKv5Bac7jbPCWVU9AAAAAElFTkSuQmCC);
        }
        &.asc-mode {
          &::before {
            transform: rotate(180deg);
          }
        }
      }
      &.active {
        color: $primary-color;
      }
      &::after {
        content: "";
        position: absolute;
        height: 24px;
        right: 0;
        top: 8px;
        border-right: #e3e3e3 1px solid;
      }
    }
  }
  .row-ico,
  .col-ico {
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: center/32px no-repeat;
    border: 1px solid #fff;
    &:hover {
      border-color: #f5f5f5;
    }
  }
  .row-ico {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABSklEQVR4Xu2ZMVLEMAxF5YKGw0CBXG7DGbgAZ+IA3GQLWqtaup3hJNkZ0dBurBmHTEZ+aSPL1teXrPwUmfwpk8cvAAADJkeAEpicADRBSoASmBwBSmByAnALUAKUwOQIUAJbEcDMPOjrW1Wf1mzN7EtETj1/7n6rtT707Nbeb8YAAIABlAA9INiMaILcAlyDzAEpB6FLpAm6+7XW+taZBD9F5CXgb1HViN1dV5tNgoHDHtIEAA6Zlh0PBQN2BPuQW8GAQ6Zlx0PBgK3A/pOxIu5+VPV9zbC19lFKeQ44u6nqa8Du/wchJDEkMSQxJLFgM0ISQxJDEkMSyyeJtdaWSBMspVx6MpaZnd29+3NURJZa62Nk33s2fAuMoJdhLQzIkMWRGGDACHoZ1sKADFkciQEGjKCXYS0MyJDFkRhgwAh6GdbCgAxZHInhFxrZG1AwUKgbAAAAAElFTkSuQmCC);
    &.active {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACpElEQVR4Xu3ZzU5TQRQH8HMWbtjCAhaU+FEMIK2hYiG2BG40JLCoC1/AZ/IBfAVxAQkhtbkloURKpMOHVCDhYwFRn6A3GXP3MvM33vSe5J6upzPT3/ynPT2XKeMvzvjnJwXQBGRcQK9AxgOgX4J6BfQKZFxAr0DGA6C/AnoF9ApkXECvQFIBsLUli81lDa81Cq6xtrYYEnHVO5+1EX9uPPCOcwxILAF2pYoBWDK80XQDrFRAAIp4oykE4M0cDrDVcgO8LofESAIo4q2WEIClFyCANdxouwEWSzhAY08IQKWIAZA1vN1xA7wqYABEEW8fCAEoT+EAu8dugJeTOMDukRCAmXEQgAzvd90AM3nsSzBOwH5XCMD0IxzAXLgBph/iAOZCCMDEKAZgreHvN26AidGQiPx1ANmIT26EADwZxgHO79wAj4dDYhDg7E4IQG6wA1ZkXb76/c5ZCeYGPxJRyT8f9/jqFzDu/pkSqwT9m5U5QgFknkv/dqUJ6J+1zJU0ATLPpX+70gQkZW1rQVy++l9M5/yp/t5ZCL0NPpClon8yinitHgDj7h2SWALs6gJYCpPh9dBdCq8uYP8FLEW8HgophZfnQQBreNPTEluexwE2d4QABLMYQNwRqu+5ExDM4gBfvgoBqD7HAZoHboBKEe8INb8JAZh7BgKQ4dahG6A8hQO0DoUAlJ7iAO1TT0tsHAdonwoBKIAtsfjBiK8lVviHllhHSktsMoclIG6JnVz7W2LIg5G4JXZ8LSQB+REc4OzWDZAfwX4FYoAft0IAxoZ6YEXW4Ut3G8uODdWxpij3+PLnALjuX4clVgn+zybSfK8CpKkvYW1NgIRTSHMPmoA09SWsrQmQcApp7kETkKa+hLU1ARJOIc09aALS1JewduYT8AdSK/5BnXHSYwAAAABJRU5ErkJggg==);
    }
  }
  .col-ico {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA6ElEQVR4Xu2X2xGAQAgDtafrv4LrSXtgnTkw6388CAmP+wr/7vD8LwlQAeEMaIFwAdgEtYAWCGdAC4QLwCmgBbRAOANagApg7/3Qf1Twa61Piod/IgEqQAvYAypNjGLaNEGayGk8ngKnE6DvSwBlcDpeBUyvII0fK8BV2FXYVdhVmDaiCr7NKhzfBCvV64TBY7BTMpVYJKDC2p8wKuBP1azkghUQPwYlwGPIY8hjqNJ9KabNMUQTOY3HY/B0AvR9CaAMTsergOkVpPGrAMrgdLwKmF5BGr8KoAxOx6uA6RWk8asAyuB0/AvoK0hBqNMf0AAAAABJRU5ErkJggg==);
    &.active {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABcElEQVR4Xu2ZoQ4CQQxEb78CSYJBIBAIDAkKydciUSQYBAKBwJAg+YrDsiSYmTbdZgc/d9vX6e00lKHzX+m8/kEA5IDOCWgEOjeAPoIaAY1A5wQ0Ap0bQLeARkAj0DkBjQBrgHG/HdlnWOjL4QQ1ExJ9H3jcrdsAcLxAtUCiCsBm2QaA8w2qBRJVAFbzNgBcH1AtkKgCsJi2AeD+gmqBRBWA2aQNAM83VAsksvhqt/IMAWilE1HnkAOiyLfyXjmA7UTULoBm/996aQdE7QIFzP72AIJ2gQJmf3sAQbtAAbO/PYCgXaCA2d8eQNAuUMDsbw6AvUWi9fQtEF0A+34BYAlm18sB2TvInp92gPcuYJX5/4HiATj/L2CV+f0AOO8CVpnfD4DzLmCV+f0AOO8CVpnfD4DzLmCV+d0AsNdQtJ6+BaILYN8vACzB7Ho5IHsH2fPLASzB7Ho5IHsH2fPLASzB7Ho5IHsH2fPLASzB7PoPseNIQUABajYAAAAASUVORK5CYII=);
    }
  }
}
.mater-box {
  margin: 20px 0 30px;
  background-color: #fff;
  border-radius: 8px;
  padding-bottom: 24px;
  min-height: 412px;
}
</style>