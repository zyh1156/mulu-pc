<template>
  <section>
    <hdiv />
    <div class="container">
      <!-- 搜索框 -->
      <div class="demand-search d-flex">
        <el-input
          class="h-50"
          @blur="searchData"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search.params.demandTitle"
        >
        </el-input>
        <div class="release"></div>
      </div>
      <!-- 展示框 -->
      <div class="show-ul d-flex flex-wrap">
        <div
          v-for="(dl, inx) in demandList"
          @click="openli(dl)"
          :key="inx"
          class="show-li"
        >
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center justify-content-between">
              <div class="position-relative">
                <img class="logo" v-lazy="dl.avatar" alt="" />
                <div class="visa" v-if="dl.authStatu == 2"></div>
              </div>
              <div class="d-flex" style="width: 255px">
                <span class="name text-truncate">{{ dl.demandName }}</span>
                <span v-if="dl.solveState == 1" class="solve">已解决</span>
              </div>
            </div>
            <div v-if="true" @click.stop class="collect text-center">收藏</div>
            <div v-else @click.stop class="collect text-center active">
              已收藏
            </div>
          </div>
          <div class="content text-truncate">{{ dl.demandSummary }}</div>
          <div class="img-list d-flex">
            <div
              v-show="inx < 3"
              v-for="(di, inx) in dl.demandImages2"
              :key="inx"
              @click.stop="showbigimg(dl, inx)"
              class="img-li d-flex justify-content-center align-items-center"
            >
              <img v-lazy="di" :key="di" alt="" />
            </div>
          </div>
          <div class="foot d-flex justify-content-between">
            <div class="d-flex">
              <div class="time">{{ dl.publishDate }}</div>
              <!-- <div class="num">2336</div> -->
            </div>
            <div></div>
          </div>
        </div>
        <div class="search-status w-100">
          <div v-if="searchBox.nosearch" class="img"></div>
          <div v-else class="text">
            <span v-if="searchBox.status == 2">我是有底线的</span>
            <span v-else class="el-icon-loading"></span>
          </div>
        </div>
      </div>
    </div>
    <fdiv />
    <div class="form-box" @click="closeForm" v-show="formVisible">
      <div class="form-body" @click.stop>
        <div class="close" @click="closeForm">
          <span class="el-icon-close"></span>
        </div>
        <div class="title">详情</div>
        <div class="content">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <img class="logo" v-lazy="demand.avatar" alt="" />
              <div class="name">{{ demand.demandName }}</div>
            </div>
            <div class="collect">收藏</div>
          </div>
          <div class="text">{{ demand.demandSummary }}</div>
          <div class="times">{{ demand.publishDate }}</div>
        </div>
        <div class="imgs d-flex flex-wrap">
          <div
            v-show="inx < 9"
            v-for="(di, inx) in demand.demandImages2"
            :key="inx"
            @click.stop="showbigimg(demand, inx)"
            class="img-li d-flex justify-content-center align-items-center"
          >
            <img v-lazy="di" :key="di" alt="" />
          </div>
        </div>
        <div class="btns">
          <div class="btn-li" v-if="showtel">
            <span>联系电话：</span>
            <span>{{ demand.telephone }}</span>
          </div>
          <div class="btn-li" @click="looktel">联系方式</div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" top="8vh" width="80%">
      <el-carousel
        indicator-position="outside"
        :autoplay="false"
        :initial-index="imgindex"
        height="calc(84vh - 120px)"
      >
        <el-carousel-item v-for="(item, inx) in imglist" :key="inx">
          <div class="big-img">
            <img :src="item" :key="item" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </section>
</template>
<script>
import hdiv from "@/components/header";
import fdiv from "@/components/footer";
export default {
  data() {
    return {
      dialogVisible: false,
      formVisible: false,
      imgindex: 0,
      imglist: [],
      demand: {},
      demandList: [],
      showtel: false,
      search: {
        params: {
          demandTitle: "",
        },
        limit: 12,
        page: 1,
        sort: "",
        order: "",
        handlerName: "busDemandListHandler",
      },
      searchBox: {
        page: 0,
        status: 0,
        nosearch: false,
      },
    };
  },
  components: {
    hdiv,
    fdiv,
  },
  mounted() {
    this.getData();
    this.toSee();
  },
  methods: {
    looktel() {
      this.showtel = true;
    },
    closeForm() {
      this.imgindex = 0;
      this.formVisible = false;
    },
    openli(dl) {
      this.demand = dl;
      this.formVisible = true;
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
        if (scrollTop + height > scrollHeight - 370) {
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
    showbigimg(dl, inx) {
      this.imglist = dl.demandImages2;
      this.imgindex = inx;
      this.dialogVisible = true;
    },
    searchData() {
      this.demandList = [];
      this.search.page = 1;
      this.getData();
    },
    getData() {
      this.searchBox.status = 1;
      let arr = this.demandList;
      this.axios
        .get("/demand/pageList", { params: this.search })
        .then((res) => {
          this.searchBox = {
            status: 2,
            page: res.data.pages,
            nosearch: res.data.records.length == 0,
          };
          res = res.data.records;
          res.forEach((element) => {
            element.demandImages2 = element.demandImages.split(",");
          });
          this.demandList = arr.concat(res);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.demand-search {
  margin-top: 32px;
  .release {
    margin-left: 10px;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: #fff center/14px no-repeat;
    border-radius: 8px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAwElEQVRIS+1WwQnDMAyUIPp3k2aEZgQ/jNdoJ2nXCH5khHYEZ5O+bYOKgwOFFmx92o/0Mz5J5riTjCCMZVkOKaV7SSOiyRjzlJRACbhgvfcnZt4aIuJkrX1IamjDD7aU0paAVDQqGvmkqbPx2FLX2/0IALd6PgNA6M0lohXneQ6IKGnYW/8bLvy0ITOvWCjNOReaemNk5mvdFhcJpcMwBDW+Gl9u/F5p7jhdwC3G1If/92GZvTHG7bftnJPM4O3xLynP3O+n30bOAAAAAElFTkSuQmCC);
  }
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.name {
  font: 14px/20px "aliPHM";
  padding: 0 8px;
  width: 205px;
}
.collect {
  cursor: pointer;
  color: #fff;
  height: 18px;
  flex-shrink: 0;
  border-radius: 9px;
  border: 1px solid $primary-color;
  padding: 1px 5px 1px 17px;
  font: 10px/14px "PingFang SC";
  background-size: 10px auto, auto;
  background-repeat: no-repeat;
  background-position: 5px center, center;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAABtklEQVRIS6WV4TEEQRCFvxcBGSACRMBlQASIABEgApcBIiADJ4IjAncZnAhava2Zrdm9vZ1Tumr+7PS8ft39uldsYRExBa6BBXAu6bP2TDWHiDgF3oEvYB+YS5rU3m0DPDOgpP2IuASegIkkf99oo8AF2ytJz0aJCJfju8a6BtyyzdS2ZT0IHBGu5Qlgli3bArxhDdxL+hiqRwOcWBwCR4CblW3p2vYfFqzzlQP5OMMXSQtFhFldAEvAMmqPHcYalHrgwCbk4yxXwLGBw1KS5It/WUScAa/Ag4FN32WwhKrC3xQ5InaTFA3eMPYHg++lRr39lXbC8BA566bZuXkZ3MzXVFCps992QO3fyq1gvjV4wfQAuMlD1AFOsnN013kmyeM7ahHh1OdDWa4NSFLJrSRvtKol/wdJ96VzB7jYDdUlU0yhG7+SZDW01ge+AR4lDWXi0rhEnaFJA3YiyXXeCOwpPC3HOI3vXdrFfmgfp94EiIhBMn3GWc/HgFPLgF40rrmbZaCdHABwJvbrlK8P7AbYKZsBvcHapZ4kZvAcwL4/kqyo4VIUqZnZ89hfIgUwW/tO++vgF2lD1t2EjdigAAAAAElFTkSuQmCC),
    linear-gradient(270deg, #eb512c 0%, #df3021 100%);
  &.active {
    color: #aaa;
    border: 1px solid #aaa;
    background: transparent;
    padding-left: 5px;
  }
}
.show-ul {
  padding: 6px 0 30px;
  .show-li {
    width: 380px;
    padding: 20px 17px;
    background-color: #fff;
    margin: 26px 30px 0 0;
    border-radius: 8px;
    transform: translateY(0) translate3d(0, 0, 0);
    transition: transform 0.2s linear;
    .solve {
      color: #999;
      margin-right: 8px;
      display: inline-block;
      flex-shrink: 0;
      font: 10px/14px "PingFang SC";
      height: 18px;
      padding: 1px 7px;
      border-radius: 9px;
      border: 1px solid #999;
    }
    .content {
      margin-top: 12px;
      font: 12px/17px "PingFang SC";
    }
    .img-list {
      margin-top: 14px;
      .img-li {
        width: 110px;
        height: 110px;
        margin-right: 8px;
        background-color: #eee;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        img {
          max-width: 100%;
          max-height: 100%;
          display: block;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .foot {
      color: #aaa;
      margin-top: 20px;
      font: 12px/17px "aliPHR";
      .num {
        margin-left: 10px;
      }
    }
    .visa {
      width: 14px;
      height: 14px;
      right: 0;
      bottom: 0;
      position: absolute;
      background-size: 14px auto;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADNklEQVRIS71WP2gTYRT/vUv6J01SC0JBF9vJpWKLgqCDqUtBTK3QQe1gC602U+vaDtahndMp1Qq1g3VQsDQiurTpIgiCkXbRxbgoCEI0qak1uU/eXS5+991dEgj4luPue9/v9/7fI9QhF+/ne326uAGgl4AOfpavpQWQBZAuabT64mYoXQuOqilEE/lRIv0OQF21gMxzkQFpcxu3Qqte+q6E7JFfFyuSJ/XxlbUEkCppdNvNYwfhpUQuopF4BhCHrgERWV3QleexcEoGsRGaZNhqgMVxVRfol0krhGYY9a3GPVM5RVYTTX3rsUCGTyqE0aVcmoCTjXjXGSZ8ywkHBOc0ORnurxCa1WgUiUOCzUCwxR3IUu4+rGFmIAAm3DsAFrf28SZTtGEJQWPJWOih4WE08TNDRMdUtgvH/ZiKtBqfF1P72PxgB+HvPUd9mI8GbFd3v5Ywu1FQ4ERmY7K9m8ot8E4lO9Plx8yAScbCoZpY23NEYPxsi0HKXspy+V7eoVvUqI8Gl3JxAFPyKYdxeSQEfsoy/fQXPn3XXdM8PxhAzxGfaVxeYOKR0zgI3KVoIpciwnkZhS1myzkPV0/9Y33w+jeSO39qEvK9hVf7Dj0hsE1u+bM84wKQLWcyJlWF9dfGQpXPXvnmmcshddaxhCgXjnsxANdON9sicX0lb1Srm9QklK13KxxuhfhwsJLvzY9Foy28hOpp+OWRIDpD5oxQq48rmSvaEq5kt+bncwG8dy0a1ToZdDZZwO6XkqEih5vfvXJs4RlF49YWKqGcIwuU+25+sK0SSm6F6Sd7nrkzMLktvBpfbRN5mnCOxs+12vpU9twrf0bj86HXaLMuqmWvAtYKpeGcEJ+TsfauMqH38LbA48NtjvHFZ16tohplG96ml86JI19SC8QiW3hZqJ43wztsJ2PhCN9Rf8ApgA555YDHXfREk0GQ3DnA47ce3W0DED800dTr+AGzzn9dMSyjykvUejVPPceI4pkuaKjqEmXpG4tvScTVv0h9RGbOfPCPWmGU79VchAF9zm0bcCPn0ge0OV4lvIyrSih77C+JIQFEQOiwli2ejRDIEpAq+mi9nlX/L4SGehp9haNqAAAAAElFTkSuQmCC);
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:hover {
      transform: translateY(-2px) translate3d(0, 0, 0);
      box-shadow: 0px 3px 19px rgba(0, 0, 0, 0.05);
    }
  }
}
.big-img {
  height: calc(84vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.search-status {
  margin: 30px auto 0;
}
.form-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: calc(50vw - 600px);
  .form-body {
    position: relative;
    background: rgba(255, 255, 255);
    width: 434px;
    padding-bottom: 38px;
    height: calc(100vh - 50px);
    border-radius: 16px;
    .close {
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 18.5px;
      font: 25px/29px "aliPHM";
      transform: rotate(0);
      transition: all 0.4s linear;
      &:hover {
        color: $primary-color;
        transform: rotate(180deg);
      }
    }
    .title {
      font: 18px/29px "aliPHM";
      padding: 18.5px 20px;
      border-bottom: 1px solid rgba(#ccc, 0.5);
    }
    .content {
      padding: 20px;
      border-bottom: 1px solid rgba(#ccc, 0.5);
      .name {
        width: 306px;
      }
      .text {
        margin-top: 10px;
        font: 14px/20px "aliPHR";
      }
      .times {
        margin-top: 20px;
        color: #aaa;
        font: 12px/17px "aliPHR";
      }
    }
    .imgs {
      padding: 6px 19px 20px;
      .img-li {
        cursor: pointer;
        margin: 14px 10px 0 0;
        width: 125px;
        height: 125px;
        background-color: #eee;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .btns {
      bottom: 38px;
      width: 100%;
      position: absolute;
      .btn-li {
        cursor: pointer;
        color: #fff;
        width: 251px;
        margin: 20px auto 0;
        background-color: $primary-color;
        border-radius: 22px;
        padding: 11px 0;
        text-align: center;
        font: 16px/22px "aliPHR";
      }
    }
  }
}
</style>