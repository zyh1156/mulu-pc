<template>
  <div class="bac">
    <div class="title d-flex align-items-end">
      <div class="tit active">密码登录</div>
      <div class="tit">验证码登录</div>
    </div>
    <div>
      <input type="text" placeholder="请输入账号" />
    </div>
    <div>
      <input type="text" placeholder="请输入密码" />
    </div>
    <div>
      <button type="submit">登录</button>
    </div>
    <div class="d-flex">
      <div></div>
      <div class="d-flex">
        <div>忘记密码</div>
        <div>免费注册</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.bac {
  background-color: rgba(255, 255, 255, 0.86);
  border-radius: 8px;
  padding: 51px 56px 91px;
  position: relative;
}
.title {
  .tit {
      color: #aaa;
    font: 20px/27px "aliPHR";
    &.active {
        color: #333;
        font-size: 26px;
        line-height: 35px;
    }
  }
}
</style>