<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      ></CommentReply>
    </van-popup>
    <!-- /评论回复 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="aritcle.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ aritcle.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="aritcle.aut_photo"
          />
          <div slot="title" class="user-name">{{ aritcle.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ aritcle.pubdate | relativeTime }}
          </div>
          <FollowUser
            class="follow-btn"
            v-model="aritcle.is_followed"
            :userId="aritcle.aut_id"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="aritcle.content"
          ref="article.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <CommentList
          :source="aritcle.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          :list="allCommentList"
          @reply-click="onReplyCick"
        ></CommentList>
        <!-- /文章评论 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = !isPostShow"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />

          <CollectArticle
            class="btn-item"
            v-model="aritcle.is_collected"
            :article-id="aritcle.art_id"
          ></CollectArticle>
          <LikeArticle
            class="btn-item"
            v-model="aritcle.attitude"
            :article-id="aritcle.art_id"
          ></LikeArticle>
          <van-icon name="isPostShow" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论区弹出框 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
            :target="aritcle.art_id"
            @post-success="onPostSuccess"
          ></CommentPost>
        </van-popup>
        <!-- /评论区弹出框 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import FollowUser from "@/components/follow-user";
import CollectArticle from "@/components/collect-article";
import LikeArticle from "@/components/like-article";
import CommentList from "@/views/article/components/comment-list.vue";
import CommentPost from "@/views/article/components/comment-post.vue";
import CommentReply from "@/views/article/components/comment-reply.vue";

import { getArticleById } from "@/api/article.js";
import { ImagePreview } from "vant";

export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      aritcle: {},
      loading: true, // isLoading
      errStatus: 0,
      followLoading: false,
      totalCommentCount: 0,
      isPostShow: false,
      allCommentList: [],
      isReplyShow: false,
      currentComment: {},
    };
  },
  provide() {
    return {
      articleId: this.articleId,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle(this.articleId);
  },
  mounted() {},
  methods: {
    // Loading article Infomation
    async loadArticle(id) {
      this.loading = true;
      try {
        const { data } = await getArticleById(id);
        this.aritcle = data.data;
        console.log(this.aritcle);
        // Wait For Loading
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
        this.$toast("Fail to Load");
      }
      this.loading = false;
    },

    // Preview Image
    previewImage() {
      const articleContent = this.$refs["article.content"];

      const imgEle = articleContent.querySelectorAll("img");

      const images = [];
      imgEle.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },

    onPostSuccess(data) {
      this.isPostShow = false;
      this.allCommentList.unshift(data.new_obj);
    },

    onReplyCick(comment) {
      console.log("onReplyCick", comment);
      this.currentComment = comment;
      this.isReplyShow = true;
    },

    onClickLeft() {
      this.$router.back()
    }
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/.van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>