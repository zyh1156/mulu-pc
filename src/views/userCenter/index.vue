<template>
  <section>
    <hdiv />
    <div class="container">
      <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
        <el-breadcrumb-item>企业认证</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="d-flex">
        <!-- 菜单列表 -->
        <div class="left-box">
          <div></div>
          <div class="list-ul">
            <router-link
              class="list-li"
              v-for="(ll, inx) in linkList"
              :key="inx"
              :to="{ path: '/' }"
            >
              {{ ll.text }}
            </router-link>
          </div>
        </div>
        <!-- 展示框 -->
        <router-view />
      </div>
    </div>
  </section>
</template>
<script>
import hdiv from "@/components/header";
export default {
  data() {
    return {
      linkList: [
        {
          text: "企业认证",
        },
        {
          text: "我的店铺",
        },
        {
          text: "账号资料",
        },
        {
          text: "商品管理",
        },
        {
          text: "我的需求",
        },
        {
          text: "我的收藏",
        },
        {
          text: "企业标签",
        },
        {
          text: "黑名单",
        },
      ],
    };
  },
  components: {
    hdiv,
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.bread {
  margin: 20px 0 30px;
}
.left-box {
  width: 252px;
  margin-right: 24px;
}
.list-ul {
  .list-li {
    display: block;
    color: #333;
    font: 14px/20px "aliPHM";
    padding: 25px 0 25px 70px;
    border-radius: 8px;
    background-color: #fff;
    margin-top: 16px;
    position: relative;
    height: 70px;
    &.link-active::before {
      position: absolute;
      content: "";
      left: 0;
      width: 2px;
      height: 25px;
      top: 22.5px;
      background: linear-gradient(180deg, #e8662e 0%, #e54027 100%);
    }
    &:hover {
      color: $primary-color;
      box-shadow: 0px 3px 19px rgba(0, 0, 0, 0.05);
    }
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>