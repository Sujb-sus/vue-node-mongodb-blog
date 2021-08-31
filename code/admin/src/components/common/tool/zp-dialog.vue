<template>
  <el-dialog
    :title="title"
    class="zp-dialog__wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:title v-if="this.$slots.title">
      <slot name="title"></slot>
    </template>
    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: "ZpDialog",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  computed: {},
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.zp-dialog__wrapper {
  /deep/ .el-dialog {
    .el-dialog__body {
      box-sizing: border-box;
      max-height: calc(~"85vh - 112px");
      overflow-y: auto;
    }
  }
}
</style>
