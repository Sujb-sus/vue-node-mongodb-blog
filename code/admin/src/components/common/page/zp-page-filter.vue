<template>
  <div class="zp-page-filter">
    <el-form ref="pageFilter" :inline="true" :label-width="labelWidth + 'px'">
      <el-form-item
        v-for="(searchItem, searchIndex) in searchForm"
        :key="searchIndex"
        :label="searchItem.label"
      >
        <!-- 输入框 -->
        <el-input
          v-if="searchItem.type == 'text'"
          v-model="searchItem.value"
          :placeholder="searchItem.placeholder || '请输入' + searchItem.label"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "zpPageFilter",
  components: {},
  props: {
    labelWidth: {
      type: Number,
      default: 100,
    },
    searchForm: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
};
</script>
<style lang="less" scope></style>
