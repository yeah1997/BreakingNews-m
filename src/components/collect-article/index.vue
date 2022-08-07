<template>
  <van-icon
    :color="isCollected ? '#ffa500' : '#777'"
    :name="isCollected ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="isLoading"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article.js";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  model: {
    prop: "isCollected",
    event: "input",
  },
  methods: {
    async onCollect() {
      this.isLoading = true;
      try {
        if (this.isCollected) {
          const { data } = await deleteCollect(this.articleId);

          console.log(data);
        } else {
          const { data } = await addCollect(this.articleId);
          console.log(data);
        }

        this.$toast.success()
        this.$emit('input', !this.isCollected)
      } catch (err) {
        this.$toast("Fail to Collect");
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang>
</style>