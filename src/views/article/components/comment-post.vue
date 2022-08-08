<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api/comment.js";

export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      // Loading UI
      this.$toast.loading({
        message: "pubish...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论的目标id
          content: this.message, //评论内容
          art_id: this.articleId ? this.articleId.toString() : this.articleId, //
        });

        console.log(data);
        this.message = "";
        this.$emit("post-success", data.data);
        this.$toast.success("pubish Success"); // Login Remind
      } catch (err) {
        this.$toast.fail("Fail To Publish");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>