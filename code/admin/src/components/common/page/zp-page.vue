<!--
 * @Descripttion: 
 * @Author: givon.chen
 * @Date: 2020-05-15 12:48:29
 * @LastEditTime: 2020-06-30 15:43:16
--> 
<template>
  <div class="zp-page-container">
    <el-card class="zp-page-el-card" shadow="never">
      <template v-slot:header class="clearfix" v-if="this.$slots.header">
        <slot name="header"></slot>
      </template>

      <div class="zp-page-body">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "zpPage",
  created() {},
  methods: {},
};
</script>
<style lang="less" scope>
.zp-page-container {
  background-color: #fff;
  .zp-page-el-card {
    border-radius: 0;
    border: 0 none;

    .el-card__header {
      font-size: 16px;
      font-weight: bold;
      color: $strongFontColor;
      background: #ffffff;
      padding: 0px 20px !important;
      line-height: 28px;
    }
  }
  .el-icon-edit {
    position: relative;
    width: 16px;
    height: 16px;
    display: inline-block !important;
    vertical-align: middle !important;
    padding: 10px;
    cursor: pointer;
    &:before {
      position: absolute;
      left: 10px;
      top: 10px;
      content: "" !important;
      width: 16px;
      height: 16px;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAByUExURUxpcTx//z1//zt9/zx8/zt9/zt8/z9//zt8/2aZ/zt8/z1//z59/z19/zx9/zx8/z9//z1//zt9/zx//zt//zt8/zt8/zx9/zt8/zt8/zt8/zt8/zt8/zt8/zt8/zt8/z9//z9//zyH/zx8/zt8/zt8/4mnP5MAAAAldFJOUwAuQoqu0usU0QW9MjVPO0wwPkVIOPf4rfXw8/bt8vnvCAwRx4muFNzGAAAAtklEQVRIx+3Q2Q6DIBCF4SloUbvv+955/1dsK6kOpoTDlUnjuSTfj0Gibv+362YU5W8FnycR/v5g5vUCD5782WoOB3lSFgcFaaPzb7GdIT7lpCr2Y8SzKE5LxMtiN0S8LC4DxMviOA34TPXdogh4Qz2neB8EPDkF4mWhIS8KwjyRKt+rvT5reHuQmpY8/fbe/0kUeb8NIu63QcT9boB4GUBeBJivA+C9VVAv7CnWN77grK2gm38vXdQ1SLUwEaMAAAAASUVORK5CYII=")
        no-repeat;
      background-size: 16px;
    }
  }
}
</style>
