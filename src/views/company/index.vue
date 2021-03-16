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
          <router-link :to="{ name: 'login' }">注册/登录</router-link>
        </div>
      </div>
    </div>
    <section class="container cont-box d-flex">
      <div class="left-box">
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
        <div class="com-classify cbox" v-if="caseMode">
          <div class="ctit">店铺案例分类</div>
          <el-collapse v-model="groupInx" accordion>
            <el-collapse-item
              v-for="(gl, inx) in groupList"
              :key="inx"
              :title="gl.classification"
              :name="gl.classification"
            >
              <div
                @click="setCaseId(glc.caseId)"
                class="cg-li"
                v-for="(glc, inx2) in gl.child"
                :key="inx2"
                :class="{ active: groupId == glc.caseId }"
              >
                {{ glc.caseName }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="com-classify cbox" v-else>
          <div class="ctit">店铺产品分类</div>
          <el-collapse v-model="groupInx" @change="setgroupId" accordion>
            <el-collapse-item
              v-for="(gl, inx) in groupList"
              :key="inx"
              :title="gl.groupName"
              :name="gl.groupId"
            >
              <div
                @click="setgroupId(glc.groupId)"
                class="cg-li"
                v-for="(glc, inx2) in gl.child"
                :key="inx2"
                :class="{ active: groupId == glc.groupId }"
              >
                {{ glc.groupName }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="right-box">
        <div
          style="padding-bottom: 25px"
          class="d-flex justify-content-between"
        >
          <div class="links-ul">
            <router-link
              class="links-li"
              v-for="(l, inx) in links"
              :key="inx"
              :to="l.path"
              v-show="!l.disabled"
            >
              <span>{{ l.text }}</span>
            </router-link>
          </div>
          <div class="sear-box d-flex">
            <div class="item-input">
              <input type="text" />
            </div>
            <div class="item-btn btn0">搜目鹿</div>
            <div class="item-btn btn1">搜本店</div>
          </div>
        </div>
        <router-view />
      </div>
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
      groupList: [],
      groupInx: 0,
      groupId: "",
      caseMode: false,
      links: [
        { path: { name: "company" }, text: "首页" },
        { path: { name: "cbrief" }, text: "店铺简介" },
        { path: { name: "ccase" }, text: "企业案例" },
        { path: { name: "cdata" }, text: "PDF资料", disabled: true },
      ],
    };
  },
  components: {
    fdiv,
  },
  watch: {
    $route() {
      this.getMode();
    },
  },
  mounted() {
    this.getData();
    this.getMode();
  },
  methods: {
    getMode() {
      let flag = this.$route.params.caseid || this.$route.name == "ccasedetail";
      if (flag) {
        // 获取案例分类
        this.getCase();
      } else {
        // 获取店铺分类
        this.getGroup();
      }
      this.caseMode = flag;
    },
    setgroupId(gid) {
      this.groupId = gid;
      this.$store.commit("setgroupId", gid);
    },
    setCaseId(cid) {
      this.groupId = cid;
      if (this.$route.params.caseid != cid) {
        this.$router.replace({
          name: "ccasedetail",
          params: {
            caseid: cid,
          },
        });
      }
    },
    getCase() {
      let comid = this.$route.params.companyid;
      this.axios
        .get("/prod/case/listAllCaseName", {
          params: { companyId: comid },
        })
        .then((res) => {
          let arr = [],
            flag;
          for (let i = 0; i < res.data.length; i++) {
            flag = true;
            arr.forEach((ele) => {
              flag = false;
              ele.classification == res.data[i].classification;
              ele.child.push(res.data[i]);
            });
            if (flag) {
              arr.push({
                classification: res.data[i].classification,
                child: [res.data[i]],
              });
            }
          }
          this.groupList = arr;
        });
    },
    getGroup() {
      let comid = this.$route.params.companyid;
      this.axios
        .get("/product/group/all", {
          params: {
            companyId: comid,
          },
        })
        .then((res) => {
          let arr = res.data;
          arr.forEach((ele) => {
            ele.child.unshift({
              groupName: "全部",
              groupId: ele.groupId,
            });
          });
          this.groupList = arr;
        });
    },
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
    width: 200px;
  }
  .right-box {
    width: 1000px;
  }
}
.left-box {
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
      min-height: 70px;
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
    .qrcode {
      padding-top: 18px;
      min-height: 76px;
      img {
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
    .ctit {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABs0lEQVRIS+1W0VHDMAyV0gW6AWUCHGcAygTABrABnYAwQdkANqBMQDuAjdmgbAADOOKez+6lvqQN3JUPjvw5ybMs6b0nMxGRUkqNRqNbIrrAOnuW3vs759yy/V4pNY2YaQdmETGO4+av+ElE3olo3QJMmPkIa+/9WQoSN38ZgClZa71k5lMRubbWPuanqaoKWT0RkTPGlPiutXbMfEJEl8aYRY7RWl8x8wMRPXNVVYKTW2snHamGV2lDYwxjHTEra21XeRJmjexTgH0/hyy/GSBg/k6AtbX2+CA9SCzqY0SisYi8WWtVbHpooPe+dM65PuaJyAo6gGACp0FFIvpoAcbQYVxvKNmiLj5tCZCINhhoJ9AOQYqiuI/c3joQTs7Mdc53BBGRug/TNM0NhBkCHPL5nQCxD/NWvTdJiQgaOusp0ZyZuxzAee9noUSZca3yckGNu5oMpmSYcepLaPJQmmZmN5ymA83uJ170b3YyyOKTXR/K7MYIgJF3vm9kZmY3fGRmQx+d3wx9EcHQD0LaMfR3Ycpkdri21MgkFxqE1DRN3XVtKYoCZpeEmKCfcFjvPTDuCw643GfovdZAAAAAAElFTkSuQmCC);
    }
    .cg-li {
      color: #666;
      font: 12px/1.5 "aliPHR";
      margin-top: 8px;
      cursor: pointer;
      &:hover,
      &.active {
        color: $primary-color;
      }
    }
  }
}
.right-box {
  padding-left: 25px;
  .links-ul {
    .links-li {
      font: 14px/40px "aliPHR";
      color: #666;
      padding: 0 25px;
      span {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          bottom: -9px;
          left: 0;
          border-bottom: transparent 3px solid;
          box-shadow: 0 0 0 transparent;
          transition: all 0.4s linear;
        }
      }
      &.link-active:nth-child(n + 2),
      &.link-exact-active {
        font-family: "aliPHM";
        color: $primary-color;
        span {
          &::after {
            border-bottom-color: $primary-color;
            box-shadow: 0px 3px 6px #ff2318;
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
  .sear-box {
    .item-input {
      input {
        border: $primary-color 2px solid;
        height: 40px;
        width: 360px;
        outline: none;
        padding-left: 24px;
      }
    }
    .item-btn {
      color: #fff;
      line-height: 36px;
      height: 40px;
      padding: 0 16.5px;
      border: $primary-color 2px solid;
      &.btn0 {
        background: $primary-color;
      }
      &.btn1 {
        border-color: #444;
        background: #444;
        margin-left: 2px;
      }
    }
  }
}
</style>