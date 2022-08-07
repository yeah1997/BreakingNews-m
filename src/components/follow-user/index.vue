<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user.js";

export default {
  name: "FollowUser",
  data() {
    return {
      followLoading: false,
    };
  },
  model: {
    prop: "isFollowed",
    event: "input",
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onFollow() {
      this.followLoading = true;

      try {
        if (this.isFollowed) {
          const res = await deleteFollow(this.userId);
          console.log(res);
        } else {
          const { data } = await addFollow(this.userId);
          console.log(data);
        }

        this.$emit("input", !this.isFollowed);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast("can not follow myself");
        }

        console.log(err);
        this.followLoading = false;
      }
    },
  },
};
</script>

<style>
</style>