<template>
  <div class="layout-container">
    <!-- Child Route -->
    <router-view></router-view>
    <!-- /Child Route -->

    <!-- Tab Bar -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="news news-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="news news-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="news news-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="news news-wode"></i>
        <span class="text">{{$store.state.user? '我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /Tab Bar -->
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  data() {
    return {
      
    };
  },
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.news {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>