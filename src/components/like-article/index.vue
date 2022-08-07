<template>
  <van-icon
    :color="attitude === 1 ? '#e5645f' : '#777'"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    :loading="isLoading"
    @click="onLike"
  ></van-icon>
</template>

<script>
import { addLike, deleteLike } from "@/api/article.js";

export default {
  name: "LikeArticle",
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    attitude: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  model: {
    prop: "attitude",
    event: "input",
  },
  methods: {
    async onLike() {
      this.isLoading = true;
      try {
        let status = -1

        if (this.attitude === 1) {
          const { data } = await deleteLike(this.articleId);

          console.log(data);
        } else {
          const { data } = await addLike(this.articleId);
          status = 1
          console.log(data);
        }

        this.$toast.success()
        this.$emit('input', status)
      } catch (err) {
        this.$toast("Fail to Like");
      }
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>