<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>

    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"> </van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteShow: false,
    };
  },
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onSearchItemClick(item, index) {
      // Delete Mode
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
      } else {
        // Search Mode
        this.$emit('search', item)
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>