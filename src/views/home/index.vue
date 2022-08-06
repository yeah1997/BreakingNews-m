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
        to="/search"
      >
        搜素
      </van-button>
    </van-nav-bar>
    <!-- /navi -->

    <!-- Tab -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
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
      <div
        slot="nav-right"
        class="humburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="news news-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /Tab -->

    <!-- Close Icon -->
    <van-popup
      v-model="isChannelEditShow"
      round
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
    <!-- /Close Icon -->
  </div>
</template>

<script>
import ArticleList from "@/views/home/components/article.vue";
import ChannelEdit from "@/views/home/components/channel-edit.vue";
import { getUserChannels } from "@/api/user.js";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";

export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false, // Channel Edit show
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  components: {
    ArticleList,
    ChannelEdit,
  },

  created() {
    this.loadChannel();
  },
  methods: {
    // Load channel List
    async loadChannel() {
      try {
        let channel = [];

        // already Login
        if (this.user) {
          const { data } = await getUserChannels();
          channel = data.data.channels;
        } else {
          // No login
          const localChannels = getItem("News_title");

          // hava Local Dta
          if (localChannels) {
            channel = localChannels;
          } else {
            // No local Data
            const { data } = await getUserChannels();
            channel = data.data.channels;
          }
        }

        this.channels = channel;
      } catch (err) {
        this.$toast("Fail to load Channel List");
      }
    },
    showPopup() {
      this.isChannelEditShow = true;
    },

    // Turn to clicked Page
    onUpdateActive(index, isChannelEditShow = ture) {
      this.active = index;
      this.isChannelEditShow = isChannelEditShow;
    },
  },
};
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
