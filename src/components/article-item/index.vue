<template>
  <van-cell class="article-item">
    <div slot="title" class="title an-multi-ellipsis--l2">{{ article.title }}</div>

    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(image, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="image" />
        </div>
      </div>

      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>

    <van-image
      slot="default"
      v-if="article.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
    display: flex;
    .title{
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value{
        flex: unset;
        padding-left: 25px;
        width: 232px;
        height: 146px;
    }
    .right-cover{
        width: 232px;
        height: 146px;
    }

    .label-info-wrap {
        span{
            margin-right: 25px;
            font-size: 23px;
            color: #b4b4b4;
        }
    }

    .cover-wrap{
        display: flex;
        padding: 30px 0;
        .cover-item {
            flex: 1;
            width: 232px;
            height: 146px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-item-img{
                width: 100%;
                height: 146px;

            }
        }
    }
}
</style>
