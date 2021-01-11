<template>
  <footer class="foot-box d-flex justify-content-center text-center">
    <div>
      <p>
        &copy;{{ year }}&nbsp;目鹿选材&nbsp;深圳目鹿技术有限公司&nbsp;版权所有
      </p>
      <p><span>电话：</span><a href="tel:0755-27904406">（0755）27904406</a></p>
      <p>
        <span>客服与建议：</span>
        <a href="mailto:service@mulook.com">service@mulook.com</a>
      </p>
      <p>
        <span>备案号：</span>
        <a href="https://beian.miit.gov.cn/">粤ICP备19050226号-1</a>
      </p>
    </div>
    <div class="qr-code">
      <div>
        <img src="@/assets/images/qrcode.png" alt="" />
      </div>
      <div>扫描关注公众号</div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.foot-box {
  color: #fff;
  font-size: 14px;
  background: #7a7a7a;
  padding-top: 25px;
  p {
    margin-bottom: 25px;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: $primary-color;
    }
  }
  .qr-code {
    margin-left: 100px;
    img {
      width: 97px;
      margin: 5px 0 12px;
    }
  }
}
</style>