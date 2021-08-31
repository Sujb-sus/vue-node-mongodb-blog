<!--
 * @Descripttion: 
 * @Author: givon.chen
 * @Date: 2020-05-07 21:05:06
 * @LastEditTime: 2020-06-29 12:09:31
-->
<template>
  <zp-page>
    <!-- 页面标题 -->
    <template v-slot:header v-if="!hideHeader">
      <zp-page-header :back="back" @back="back && $emit('back')">
        <slot name="header">{{ header }}</slot>
      </zp-page-header>
    </template>

    <!-- 搜索框 -->
    <div class="zp-page-filter" v-if="this.$slots['filter']">
      <slot name="filter"></slot>
    </div>

    <!-- 搜索框按钮组 -->
    <div class="zp-search-button" v-if="this.$slots['button']">
      <slot name="button"></slot>
    </div>

    <!-- 列表、分页 -->
    <div class="zp-page-list">
      <slot name="list"></slot>
    </div>
  </zp-page>
</template>
<script>
import zpPage from "./zp-page";
import zpPageHeader from "./zp-page-header";

export default {
  name: "zpPageList",
  components: {
    zpPage,
    zpPageHeader,
  },
  props: {
    back: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: "",
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scope>
.zp-search-button {
  padding-bottom: 20px;
  padding-top: 0;
  .el-button {
    border-radius: 1px;
    width: 100px !important;
  }
}
.el-table {
  th {
    font-size: 14px;
  }
  td {
    font-size: 13px;
  }
  .el-button--text {
    padding-top: 0;
    padding-bottom: 0;
    height: 18px;
    line-height: 18px;
    font-size: 13px;
    border: 0 none;
    span {
      vertical-align: top;
      display: inline-block;
      line-height: 18px;
    }
  }
}
.el-pagination {
  padding-bottom: 0 !important;
  margin-top: 24px;
}
.el-pagination__sizes {
  .el-select {
    .el-input {
      .el-input__inner {
        padding-left: 0 !important;
      }
    }
  }
}
</style>
