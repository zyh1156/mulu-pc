<template>
  <header class="header-box d-flex align-items-center">
    <div class="header-body justify-content-between d-flex align-items-center">
      <!-- 左边 -->
      <div class="d-flex align-items-center">
        <router-link :to="{ path: '/' }" class="logo">
          <img src="@/assets/images/mulook-logo.png" alt="" />
        </router-link>
        <div class="link-box d-flex left-link">
          <router-link
            :to="ll.url"
            class="link-li"
            v-for="(ll, inx) in leftLink"
            :key="inx"
          >
            {{ ll.text }}
          </router-link>
        </div>
      </div>
      <!-- 右边 -->
      <div class="d-flex align-items-center">
        <!-- 搜索框 -->
        <div class="search-box d-flex align-items-center">
          <input type="text" class="text" placeholder="请输入关键字" />
          <div class="icon">
            <img src="@/assets/icon/search-ico.png" alt="" />
          </div>
        </div>
        <!-- 菜单栏 -->
        <div class="link-box d-flex right-link">
          <div
            :to="ll.url"
            class="link-li"
            v-for="(ll, inx) in rightLink"
            :key="inx"
          >
            {{ ll.text }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      leftLink: [
        {
          url: {
            path: "/",
          },
          text: "首页",
        },
        {
          url: {
            name: "case",
          },
          text: "案例",
        },
        {
          url: {
            name: "demand",
          },
          text: "需求",
        },
        {
          url: {
            name: "material",
          },
          text: "材料",
        },
      ],
      rightLink: [
        {
          url: {},
          text: "设计工具",
        },
        {
          url: {
            name: "login",
          },
          text: "登录/注册",
        },
        {
          url: {},
          text: "操作指南",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.header-box {
  height: 74px;
  background: #fff;
  .header-body {
    width: 1200px;
    margin: 0 auto;
    font: 18px "aliPHM";
    .logo {
      cursor: pointer;
      display: block;
      img {
        height: 46px;
      }
    }
  }
}
.link-box {
  &.left-link {
    margin-left: 37px;
    .link-li {
      margin-right: 30px;
    }
  }
  &.right-link {
    .link-li {
      margin-left: 30px;
    }
  }
  .link-li {
    line-height: 25px;
    cursor: pointer;
    position: relative;
    display: block;
    &.link-active {
      color: $primary-color;
      &::after {
        content: "";
        position: absolute;
        width: 34px;
        height: 3px;
        bottom: -8px;
        left: calc(50% - 17px);
        background: $primary-color;
        box-shadow: 0px 3px 6px $primary-color;
      }
    }
    &:hover {
      color: $primary-color;
    }
  }
}
.search-box {
  height: 32px;
  border-radius: 16px;
  background: #e2e2e2;
  input.text {
    padding-left: 16px;
    border: none;
    background-color: transparent;
    outline: none;
    font: 12px/32px "aliPHR";
  }
  .icon {
    margin: 0 20px 0 10px;
    img {
      height: 25px;
    }
  }
}
</style>