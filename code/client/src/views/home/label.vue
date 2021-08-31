<template>
  <div class="home-wrapper">
    <div class="home-body">
      <router-view> </router-view>
      <div class="side-wrapper">
        <search></search>
        <label-classify></label-classify>
        <side-article :sideClassify="BROWSE_STATUS"></side-article>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "components/search";
import LabelClassify from "components/labelClassify";
import SideArticle from "components/sideArticle";
import { BROWSE_STATUS } from "src/constant/side";
export default {
  name: "labelComponent",
  components: {
    Search,
    LabelClassify,
    SideArticle,
  },
  props: {},
  computed: {},
  data() {
    return {
      BROWSE_STATUS,
    };
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
</style>
