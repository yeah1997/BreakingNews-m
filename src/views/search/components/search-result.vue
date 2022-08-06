<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="Fail to Load, Please try again!"
      @load="onLoad"
    >
      <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";

export default {
  name: "SearchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    // Load Search Result
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        const { results } = data.data;
        this.list.push(...results);

        this.loading = false;

        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast("Fail to Load")
      }
    },
  },
};
</script>

<style>
</style>