<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
    <CopyRight></CopyRight>
    <Top></Top>
  </div>
</template>
<script>
import CopyRight from "components/copyRight";
import Top from "components/top";
import Nav from "components/nav";
import { mapActions } from "vuex";
export default {
  name: "app",
  components: {
    CopyRight,
    Top,
    Nav,
  },
  created() {
    this.getLabelList();
  },
  methods: {
    ...mapActions({
      getLabelList: "label/getLabelList",
    }),
  },
};
</script>