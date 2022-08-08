<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="Fail to Load"
      :immediate-check="false"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/comment-item.vue"

import { getComment } from "@/api/comment.js";

export default {
  name: "CommentList",
  data() {
    return {
      //   list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  created() {
    this.loading= true
    this.onLoad();
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    type: {
      type: String,
      default: 'a',
      validator(val) {
        return ['a', 'c'].includes(val)
      }
    }
  },
  components: {
    CommentItem,
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComment({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), //源id，文章id或评论id
          offset: this.offset, // 	获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });

        const { results } = data.data;
        this.list.push(...results);
        console.log(222, data);

        this.$emit("onload-success", data.data);

        this.loading = false; 
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
        this.finished = true;
        this.$toast("Fail to Load");
      }
    },
  },
};
</script>

<style>
</style>