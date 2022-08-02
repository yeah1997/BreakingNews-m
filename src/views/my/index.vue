<template>
  <div class="my-container">
    <!-- After Login -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" cla round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- After Login -->

    <!-- Before Login -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="../../assets/mobile.png" />
        <span class="text">登陆 / 注册</span>
      </div>
    </div>
    <!-- /Before Login -->

    <!-- Navi -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="news news-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="news news-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /Navi -->

    <!-- Msg -->
    <van-cell title="消息内容" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      center
      clickable
      @click="onLogout"
    />
    <!-- /Msg -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user.js";

export default {
  name: "MyIndex",

  data() {
    return {
      userInfo: {},
    };
  },

  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },

  computed: {
    ...mapState(["user"]), // Get user Infomation from Vuex Container
  },
  methods: {
    // Func for Logout Button
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出?",
          message: "确认退出?",
        })
        .then(() => {
          // on confirem
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("LogOut");
        });
    },
    // Load User Infomation
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('Fail to get User Info')
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 366px;
    background-image: url("../../assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        height: 132px;
        width: 132px;
        margin-bottom: 15px;
      }
      .text {
        color: #fff;
        font-size: 28px;
      }
    }
  }

  .user-info {
    .base-info {
      height: 234px;
      padding: 76px 32px 23px;
      box-sizing: border-box;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          color: #fff;
        }
      }
    }
    .data-status {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .count {
          font-size: 36px;
          color: #fff;
        }
        .text {
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }

  .grid-nav {
    margin-bottom: 9px;
    .grid-item {
      height: 141px;
      i.news {
        font-size: 45px;
      }
      .news-shoucang {
        color: #eb5253;
      }
      .news-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    height: 104px;
    margin-top: 9px;
    span {
      display: flex;
      justify-content: center;
      font-size: 30px;
      color: #d86262;
    }
  }
}
</style>