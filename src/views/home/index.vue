<template>
  <div class="home-container">
    <!-- navi -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        icon="search"
        round
      >
        搜素
      </van-button>
    </van-nav-bar>
    <!-- /navi -->

    <!-- Tab -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- <van-tab :title="{}">内容 1</van-tab> -->
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- ArticleList -->
        <ArticleList :channel="channel"></ArticleList>
        <!-- /ArticleList -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="humburger-btn">
        <i class="news news-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /Tab -->
  </div>
</template>

<script>
import ArticleList from '@/views/home/components/article.vue'
import { getUserChannels } from '@/api/user.js'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: []
    }
  },

  components: {
    ArticleList
  },

  created () {
    this.loadChannel()
  },
  methods: {
    // Load channel List
    async loadChannel () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('Fail to load Channel List')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 92px;
  padding-top: 172px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    height: 64px;
    width: 555px;
    background-color: #5babfb;
    font-size: 26px;
    border: none;
    .van-button__icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 80px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      height: 80px;
      border: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      height: 6px;
      width: 31px !important;
      background-color: #3296fa;
      bottom: 9px;
    }

    .placeholder {
      width: 66px;
      flex-shrink: 0;
      height: 82px;
    }

    .humburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.9;
      i {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1.5px;
        height: 100%;
        opacity: 0.9;
        background-image: url(../../assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
