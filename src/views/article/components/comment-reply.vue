<template>
  <div class="comment-reply">
    <!-- Navi -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <!-- /Navi -->

    <div class="scroll-wrap">
      <CommentItem :comment="comment"></CommentItem>

      <van-cell title="全部回复"></van-cell>
      <CommentList
        :list="commentList"
        :source="comment.com_id"
        type="c"
      ></CommentList>
    </div>

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /发布评论 -->

    <van-popup v-model="isPostShow" position="bottom" style="height: 30%">
      <CommentPost
        :target="comment.com_id"
        @post-success="onPostSuccess"
      ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/comment-item.vue";
import CommentList from "@/views/article/components/comment-list.vue";
import CommentPost from "@/views/article/components/comment-post.vue";

export default {
  name: "CommentReply",
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  methods: {
    onPostSuccess(data) {
      this.isPostShow = false;
      this.comment.reply_count++;
      this.commentList.unshift(data.new_obj);
    },
  },
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>