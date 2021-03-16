<template>
  <div class="bac">
    <div class="title d-flex align-items-end">
      <div class="tit active w-125">找回密码</div>
    </div>
    <!-- 验证码登录 -->
    <form action="javascript:;">
      <div class="form-box">
        <input
          type="text"
          name="username"
          v-model="udata.username"
          placeholder="请输入手机号"
        />
      </div>
      <div class="form-box d-flex align-items-center">
        <input
          type="text"
          class="mes-code"
          name="password"
          v-model="udata.password"
          placeholder="请输入短信验证码"
        />
        <div class="code" @click="getcode" :class="{ ban: code.status }">
          <span v-if="code.status">{{ code.time }}&nbsp;秒后重新发送</span>
          <span v-else>获取验证码</span>
        </div>
      </div>
      <div class="btn-box">
        <button class="w-100 login-btn" type="submit">确认修改</button>
      </div>
    </form>
    <div class="d-flex links">
      <span>已有帐号？</span>
      <router-link class="li0" :to="{ name: 'login' }">登录</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      code: {
        time: 59,
        status: false,
      },
      udata: {
        username: "",
        password: "",
        accountType: "USERNAME",
      },
      readpass: false,
    };
  },
  methods: {
    changeType(inx) {
      this.type = inx;
      this.udata.password = "";
      this.udata.accountType = this.type == 0 ? "USERNAME" : "MOBILE";
    },
    getcode() {
      if (this.code.status == false) {
        this.code.status = true;
        let time = 59;
        let clock = setInterval(() => {
          time--;
          this.code.time = time;
          if (time <= 0) {
            clearInterval(clock);
            this.code = {
              time: 59,
              status: false,
            };
          }
        }, 1000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.bac {
  background-color: rgba(255, 255, 255, 0.86);
  border-radius: 8px;
  padding: 51px 56px 91px;
  position: relative;
  width: 551px;
}
.title {
  padding-bottom: 28px;
  .tit {
    color: #aaa;
    cursor: pointer;
    font: 20px/27px "aliPHR";
    &.active {
      color: #333;
      font-size: 26px;
      line-height: 35px;
    }
    &.w-125 {
      width: 125px;
    }
  }
}
.form-box {
  margin-top: 30px;
  border-bottom: 1px solid #dcdee0;
  input {
    width: 100%;
    border: none;
    outline: none;
    font: 16px/22px "aliPHR";
    padding: 14px 6px;
    letter-spacing: 1px;
    background-color: transparent;
    &.mes-code {
      letter-spacing: 5px;
    }
  }
  .eye-0,
  .eye-1 {
    width: 36px;
    height: 24px;
    flex-shrink: 0;
    cursor: pointer;
    background: center/24px 24px no-repeat;
  }
  .eye-0 {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD50lEQVRoQ+1YS1IbMRDtnio0y8AJYk4QOEHMCZKcIPbGmlkBJwg5QcxqRmxsThA4AeYEcU6AOUHM0lAlUT0luWRZ4/nYkxSpmSoKfyR1v/f6JyO88QffuP/QAvjXCrYKtApsyUAbQlsSuPX2VoGtKdzygP9HASHEDwDoSikv4zgeb0lMI9uTJOkFQTBSSo2jKOqTkUyB0Wi0//z8/EdbnTPGDvv9/rwRL2oeqn18AIB9OkJKeRjH8WwZQkKIGQC8py+VUpdRFJ3VtNXItjRNh4h4qv37HUXR0VIBemHkMdYR8XgwGEwb8abioVdXV0dKqV9mm5Syb8J8JYnTNJ0i4ge9cMo5P65oq5HlQghyPmMcAO45590l0bbFJEm6QRDcWZ9955xfNOJVyUPt0MlCxomMtTLqbrDlKmlzZ8vcsAaANUK9fcAJpTXUO/Nww0FCiM8A8NMsUUotE9fe5gWgSxZVpXd6MZXUPuf85i86PzIlEwCeGGMdX2nP7cQe+aj2LrO/KSBpmp4i4tA+f5NdLwBdtiiZs6bhPDdSynNqIrsEoVUn1il03GcupTz22VwDoA8i503ZegIACqGsyZmQUkpdhGF4vW3H1vaoQVHjtAl71O9NGE8ZYyeuvTUATs3NEnhvb2+2WCzGiPjJoYaAjfX8VEmRJEk6QRCQ4z1XaaXUbRiGvZeXl47dwABgrTe5jWyEiHRg9rixpysDxaetRrZWKUUAJohIfxmYwWBwT/8pJKkgKKXIoS4i0nujsM0JsX5mFws3F+1BjjbasxA1rG/mtLx5SDNHQ1UTzxdfpRNCrPhm94MMgKfiXHPOl0rYnjqHPSql5tb4URUUMU6PGSJvoyjyJTEIIWjE/+pGB7qDEjWMMAy7vuR0R1oAOOecD/XnXSs8Or4wozlGKUXz1oQxNiEb7vhixmSXCbKxWCwoPM2sRsSdYJqmD4hIBimOc533KJXbXIxxIYTSr1cGMNc5IcQEAD7qz3PV10TRhGxycI7WPeAJEbubRmgbrG8u8ThWFsDK2MAYO8grzzpiCDCV10fUSdlDxJtNzjt5Usi+c8vbqAABty9UReQYn6WU49KX+qrsO7FdCMAhaM45PyhTEUoBcJwpZF/ni323KASgVaDGmHXesnNXKQBpmt5RfuhEL3VfrqqABmDX+1I3wkIAnvto9mtAkbx1ALhjvJTyJI5jStjcpxCAc7HILXGuhToAPCp4O7NtqxCAVf87jLFh2emzLgCtwpmUclbmB7ZSAIrCxfd9XQBVbTUGQIcDxS9Nnb2mrqONAqjKZp31LYA6rO1yT6vALtmsc1arQB3WdrnnzSvwCnmHP5dvPuPoAAAAAElFTkSuQmCC);
  }
  .eye-1 {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEmUlEQVRoQ+1Y0XEbNxDdvRmB/Is6CF2BqQpCVRCpgpg/xPErcgW2Koj8xYN+GFcQuQLTFZiqIFIFIf8kanSbeTc4DQjhDiAZxaMZYub4cQT29u2+Xewu0ytf/Mr1pz2AH+3BvQf2HtjRAnsKTafTw4eHh7ciMhCRHhH1mPmQiPqececisiCiG2bGMzs4OLgeDod4t/XaygNQerVa/UpEJ/bZWgEiusKjlPqyDZiNAFjFfyeiMyKClf/LBU9cKKU+bQIkGYAx5kOi4t+ASkTmzFzRQ0QOmbmm1C8R1BUQrfV5inWiAC4vL/siMg1wupIvIl9EBDSYjcfjm5SPQubj42OfmU+YGVQMLRhgOBqN5m0yWwFMJpN3WZb9EaDL0rr7YhN3hxSxtAQl8fzk7VmUZfl+PB7/2QSiEYBVHpb317lSamfFfaEOEFB1bZVlOWwCEQTQoPyyLMuT8Xg8a3PpZDLpZVkGnveQVpEysR9pczQaVfEROT/IsgyUXPNGE4hnAELKi8h1p9MZtNFlMpkMmPkDMw9aFEzKNPDG/f39jJnfurJCINYA2ID97h5KUd4YgzgBh5OWiNxkWXbaFqBNIJj5yD33BMBy8G83YFOUL4piyszvPM1vkZVw69r38IqfPhfMfLwFiIVS6k3NhicARVF89dwPzvfbUqMx5iMRuUGHM2ehgENsMPOFlzbXlAm5z8YUUulTTIjILM/z4yq28GOMQUnwl8e347aAtYJBt/pGXsIAsbwdAP1Za+17cA0L4ivLsq8ewFOt9RVbrn1nZhRi1RKRT3met3LaGIP/wf16VQJTgsAYA3rVlIp6ATKLooD3UMbUOt50Op0jDljkVinVj11QnhK3WusnA8RA+B4vy7LV25BnYxQx5abXcwD4x7tpkyxpjAF9qvoG5USe56Bh0rL0Q8Ko13ut9UXscIDqCwBAbnZRJQEoigK1SpWnfyCA5TMKIUeDW5tQCGfyPH8Ts2D9/w4UWkvzRHReBfFqtUKa+vn/CmIvZS+VUr2YwfwgJqIqVndNo25+jl5MoWxCRLulUcetbmrDa5SyRxteZIinM631Z59ONnCRdt1gj1o/cN9A9DetdVVz+aWEn6bmSqnjNvcaY1Cr/+YqjJhAKVFXomj4A0Ve9OKz9MYF5g4I1tJ8tJgjoiiIAD9j8XyLbixWB61WK195lOXhYq7+YkMvEAVhr3vURm09b1In12B5ipbTERCIidOUhoaIULugoUEzXzX2ZVmiZ25thrDPGgJ12drUI7mhiYDA3x83HX3E+OSUCvXkY+3Ixi2lBwJX/LNme5sZTghIZNbUWJ7XsqJjFVvHX/ntnaNMNVlj5utYKV2fsZ0fypDGyR6aKRFBD946qokCcO4JBGho9LFmWDQb9kU1A7W1UjUzrfJ2e8+MLVWga63xvehKBuDwtGmGE/1YZENShvJlbASgPgze3t3dYarWNllLAlRP9rrd7lWsHgoJ3AqAK8iC6WdZhtsST93Y+PdBPRMCreZlWc673e58G6Xd7+8MIMnML7hpD+AFjZskeu+BJDO94Ka9B17QuEmiX70H/gXOdso0LgMnbAAAAABJRU5ErkJggg==);
  }
  .code {
    color: $primary-color;
    font: 16px/22px "aliPHR";
    width: 118px;
    flex-shrink: 0;
    cursor: pointer;
    text-align: right;
    &.ban {
      color: #ccc;
    }
  }
}
.btn-box {
  margin-top: 102px;
  .login-btn {
    border-radius: 2px;
    color: #fff;
    outline: none;
    border: none;
    font: 19px/49px "aliPHR";
    background: linear-gradient(180deg, #ff5244 0%, #ff1e13 100%);
  }
}
.links {
  color: #999;
  margin-top: 13px;
  font: 14px/20px "aliPHR";
  justify-content: flex-end;
  .li0 {
    margin: 0 5px;
    color: $primary-color;
  }
}
</style>