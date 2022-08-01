<template>
  <div class="login-container">
    <!-- navi -->
    <van-nav-bar class="page-nav-bar" title="登陆" />
    <!-- /navi -->

    <!-- login form -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="news news-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="验证码"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        maxlength="11"
      >
        <i slot="left-icon" class="news news-yanzhengma"></i>
        <template #button>
          <!-- CountDown -->
          <van-count-down
            :time="1000 * 15"
            format="ss s"
            v-if="isCountdownShow"
            @finish="isCountdownShow = false"
          />
          <!-- /CountDown -->

          <van-button
            v-else
            native-type="button"
            round
            size="small"
            class="send-msg-btn"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block class="login-btn" type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
    <!-- login form -->
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "", // TEL
        code: "", // Code
      },
      // Input Rull
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^1[3|7|8|5]\d{9}$/,
            message: "手机号不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码不正确",
          },
        ],
      },
      isCountdownShow: false, // CountDown and Code Verification
    };
  },
  methods: {
    // Form Submit
    async onSubmit() {
      const user = this.user;

      // Loading UI
      this.$toast.loading({
        message: "login...",
        forbidClick: true,
        duration: 0,
      });

      try {
        const res = await login(user);
        console.log("Login Success", res);
        this.$toast.success("Login Success"); // Login Remind
      } catch (err) {
        // Code err
        if (err.response.status === 400) {
          this.$toast.fail("Code Error");
        } else {
          this.$toast.fail("Login Fail");
        }
      }
    },
    // Sms Code Send
    async onSendSms() {
      // Verification mobile Num
      try {
        await this.$refs.loginForm.validate("mobile");
        this.$toast.success();
      } catch (err) {
        return this.$toast.fail();
      }
      // show countdown element
      this.isCountdownShow = true;

      // Verification Code
      try {
        const res = await sendSms(this.user.mobile);
        console.log(res);
      } catch (err) {
        this.isCountdownShow = false  // Countdown No-Show
        if(err.response.status === 429) {
          this.$toast("Too often")
        } else {
          this.$toast("Send Fail")
        }
      }
    },
  },
};
</script>

<style　scoped lang="less">
.login-container {
  .news {
    font-size: 37px;
  }

  .send-msg-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: rgb(237, 237, 237);
    font-size: 22px;
  }

  .login-btn-wrap {
    padding: 53px 28px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>