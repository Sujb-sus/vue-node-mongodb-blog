
<template>
  <div class="bread-crumbs">{{ title }}</div>
</template>

<script>
export default {
  name: "breadCrumbs",
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      title: "首页",
    };
  },
  watch: {},
  created() {
    let matched = this.$route.matched;
    if (matched && matched.length) {
      this.title = matched[matched.length - 1].meta["title"];
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.bread-crumbs {
  background-color: #f7f7f7;
  padding: 10px 24px;
  color: @mainColor;
}
</style>
