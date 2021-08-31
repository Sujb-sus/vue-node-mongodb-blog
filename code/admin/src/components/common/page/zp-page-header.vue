<!--
 * @Descripttion: 
 * @Author: givon.chen
 * @Date: 2020-06-02 14:48:49
 * @LastEditTime: 2020-06-30 15:41:59
-->
<template>
  <div class="zp-page-header">
    <!-- 带返回 -->
    <el-page-header
      :class="{ hideBack: !back }"
      @back="$emit('back')"
      :title="title"
    >
      <template v-slot:content>
        <slot>
          {{ header }}
        </slot>
      </template>
    </el-page-header>
  </div>
</template>

<script>
export default {
  name: "zpPageHeader",
  props: {
    header: {
      type: String,
      default: "",
    },
    back: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "返回",
    },
  },
};
</script>

<style lang="less" scope>
.zp-page-header {
  display: flex;
  align-items: center;
  height: 54px;
  font-weight: bold;

  .el-page-header {
    flex-grow: 1;
    padding-left: 0;
    box-shadow: none;
    line-height: 28px !important;

    .el-page-header__content {
      // header 里 tabs的情形
      .el-tabs {
        .el-tabs__header {
          margin: 0;
          .el-tabs__nav-wrap {
            padding-left: 0;
          }
        }
      }
    }
  }
  .hideBack {
    .el-page-header__left {
      display: none;
    }
  }
}
</style>
