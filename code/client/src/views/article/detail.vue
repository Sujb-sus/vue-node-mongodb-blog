<template>
  <div class="home-wrapper">
    <div class="home-body">
      <router-view></router-view>
      <div class="side-wrapper">
        <side-article :sideClassify="BROWSE_STATUS"></side-article>
        <side-article
          :sideClassify="RECOMMEND_STATUS"
          :class="{ 'side-sticky': showSide && showSticky }"
        ></side-article>
      </div>
    </div>
  </div>
</template>

<script>
import SideArticle from "components/sideArticle";
import { BROWSE_STATUS, RECOMMEND_STATUS } from "src/constant/side";
import DetailContent from "./components/detailContent";
import LabelClassify from "components/labelClassify";
export default {
  name: "labelComponent",
  components: {
    SideArticle,
    DetailContent,
    LabelClassify,
  },
  props: {},
  computed: {},
  data() {
    return {
      BROWSE_STATUS,
      RECOMMEND_STATUS,
      scrollTop: 0,
      showSticky: false,
      showSide: true,
    };
  },
  watch: {},
  created() { },
  mounted() {
    document.documentElement.scrollTop = document.body.scrollTop = 0
    const clientHeight = document.documentElement.clientHeight;
    this.showSide = clientHeight > 665; // 665是一个side-article组件的高度
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.showSticky = this.scrollTop > 665;
    },
  },
};
</script>

<style lang="less" scoped>
.side-sticky {
  position: sticky;
  top: 0;
}
</style>
