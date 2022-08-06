<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <span v-html="text ? highlight(text) : ''" slot="title"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";

export default {
  name: "SearchSuggestoion",
  data() {
    return {
      suggestions: [],
      htmlStr: "",
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val);
      }, 300),
    },
  },
  methods: {
    async loadSearchSuggestions(val) {
      try {
        if (!this.searchText) {
          return;
        }

        const { data } = await getSearchSuggestions(val);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("Fail to Load!");
      }
    },
    highlight(text) {
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(
        reg,
        `<span class="active">${this.searchText}</span>`
      );
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/span.active {
    color: #3296fa !important;
  }
}
</style>