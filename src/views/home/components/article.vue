<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshDataCount"
    >
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="article in list"
          :key="article.art_id"
          :title="article.title"
          :article="article"
        />
        <!-- <van-cell v-for="obj in list" :key="obj.art_id" :title="obj.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticles } from '@/api/article.js'

export default {
  name: 'ArticleList',
  data () {
    return {
      list: [],
      loading: false, // is Loading data?
      finished: false, // Loading Finished?!
      timestamp: null, // time stamp
      error: false, // error
      refreshing: false,
      refreshDataCount: '刷新成功'
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  components: {
    ArticleItem
  },

  methods: {
    // load channel Date
    async onLoad () {
      // Lodad Success
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // Channel ID
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        const { results } = data.data
        this.list.push(...results)

        // Loading Complited
        this.loading = false

        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // catch Err
        console.log('err1', err)
        this.error = true
        this.loading = false
      }
    },

    // Refresh List
    async onRefresh () {
      // Get New List
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // Channel ID
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data

        this.refreshDataCount = `刷新成功${results.length}条数据`
        this.list.unshift(...results)

        // Refreshing is over
        this.refreshing = false
      } catch (err) {
        this.refreshing = false
        this.refreshDataCount = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
