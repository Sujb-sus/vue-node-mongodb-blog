<template>
  <div class="tabs-wwrapper">
    <router-link
      class="tab-view"
      :to="tag.path"
      v-for="tag in getTags"
      :key="tag.name"
    >
      <el-tag
        size="small"
        closable
        :type="getIsActive(tag) ? '' : 'info'"
        @close="closeTagView(tag, $event)"
      >
        {{ tag.name }}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    getTags() {
      let tagArr = this.$store.state.app.tagViews;
      return tagArr.filter((item) => item.path !== "/article/edit").slice(-6);
    },
  },
  watch: {
    $route() {
      this.addTagView();
    },
  },
  mounted() {
    this.getIsActive();
  },
  methods: {
    getIsActive(tag) {
      if (!tag) return;
      return tag.path === this.$route.path;
    },
    closeTagView(tag, e) {
      this.$store.dispatch("delTagView", tag);
      e.preventDefault();
    },
    generateRoute() {
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        return this.$route.matched[this.$route.matched.length - 1];
      }
      return this.$route.matched[0];
    },
    addTagView() {
      this.$store.dispatch("addTagView", this.generateRoute());
    },
  },
};
</script>


<style lang="less" scoped>
.tab-view {
  margin-left: 10px;
}
</style>