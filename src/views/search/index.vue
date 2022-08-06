<template>
  <div class="search-container">
    <!-- Search Grid -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /Search Grid -->

    <!-- SearchResult -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!-- /SearchResult -->

    <!-- SearchSuggestoion -->
    <SearchSuggestoion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></SearchSuggestoion>
    <!-- /SearchSuggestoion -->

    <!-- SearchHistory -->
    <SearchHistory
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    ></SearchHistory>
    <!-- /SearchHistory -->
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history.vue";
import SearchSuggestoion from "@/views/search/components/search-suggestion.vue";
import SearchResult from "@/views/search/components/search-result.vue";

import { setItem, getItem } from "@/utils/storage";

export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      isResultShow: false, // Result Show?
      searchHistories: getItem("News_Search_Histories") || [],
    };
  },
  components: {
    SearchHistory,
    SearchSuggestoion,
    SearchResult,
  },
  watch: {
    searchHistories(val) {
      setItem("News_Search_Histories", val);
    },
  },

  methods: {
    onSearch(text) {
      this.searchText = text;
      const index = this.searchHistories.indexOf(text);

      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(text);

      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
    onFocus() {},
  },
};
</script>

<style scpoed lang="less">
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>