<template>
  <zp-page>
    <!-- 页面标题 -->
    <div slot="header">
      <zp-page-header :back="back" @back="$emit('back')">
        <slot name="header">{{ header }}</slot>
      </zp-page-header>
    </div>

    <!-- 主体body -->
    <div class="zp-page-edit">
      <slot></slot>

      <!-- 保存等操作按钮 -->
      <div class="zp-page-edit-button" v-if="this.$slots.button">
        <slot name="button"></slot>
      </div>
    </div>
  </zp-page>
</template>
<script>
import zpPage from "./zp-page";
import zpPageHeader from "./zp-page-header";

export default {
  name: "zpPageEdit",
  components: {
    zpPage,
    zpPageHeader,
  },
  props: {
    header: {
      type: String,
      default: "",
    },
    back: {
      type: Boolean,
      default: true,
    },
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scope>
.zp-page-edit {
  .el-form {
    margin-top: 20px;
  }
  .el-input {
    width: 220px;
  }
  .el-textarea {
    width: 440px;
    .el-textarea__inner {
      min-height: 100px !important;
    }
  }
  .zp-notice-subtitle {
    width: 540px;
    box-sizing: border-box;
  }
}
.zp-page-edit-button {
  padding: 20px 20px 20px 120px;
}
</style>
