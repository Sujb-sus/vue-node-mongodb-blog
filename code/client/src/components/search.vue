<template>
  <div class="search-container">
    <input type="text" placeholder="请输入关键词" v-model="keyword" />
    <button
      :class="{ 'btn-disabled': !keyword }"
      :disabled="!keyword"
      @click="goto"
    >
      搜索
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "search",
  components: {},
  props: {
    // 是否存储在vuex
    isCache: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapGetters({
      cacheKeyword: 'search/keyword'
    })
  },
  data() {
    return {
      keyword: "",
    };
  },
  watch: {},
  created() {
    if (!this.isCache) {
      this.keyword = this.cacheKeyword;
    }
  },
  mounted() { },
  beforeDestroy() {
    if (!this.isCache) {
      this.setKeyword('');
    }
  },
  methods: {
    ...mapMutations({
      setKeyword: 'search/setKeyword'
    }),
    goto() {
      if (this.isCache) {
        this.setKeyword(this.keyword);
      }
      this.$router.push({
        path: `/label/${this.keyword}`,
        query: {
          search: 'search'
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 6px 6px 8px @shadowColor;
  input {
    padding: 0 6px;
    border: 1px solid @borderColor;
    width: 80%;
    height: 26px;
    line-height: 26px;
    background-color: #f2f2f2;
    height: 28px;
    font-size: 14px;
    border-radius: 2px;
    &::placeholder {
      color: @assistColor;
    }
    &:focus {
      outline: none;
      color: #24292e;
    }
  }
  button {
    border-radius: 2px;
    background-color: #24292e;
    color: #fff;
    width: 20%;
    border: none;
    cursor: pointer;
    height: 28px;
    line-height: 28px;
    margin-left: 12px;
    a {
      color: #fff;
    }
    &.btn-disabled {
      cursor: not-allowed;
      opacity: 0.75;
    }
  }
}
</style>
