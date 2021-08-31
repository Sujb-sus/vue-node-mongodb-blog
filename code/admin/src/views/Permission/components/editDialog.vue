<template>
  <zp-dialog
    title="管理员编辑"
    :visible.sync="dialogTableVisible"
    @close="close"
    width="480px"
    :destroy-on-close="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form :model="info" :rules="rules" ref="form">
      <el-form-item label="用户名：" prop="username">
        <el-input type="text" v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item label="原密码：" prop="old_pwd">
        <el-input type="password" v-model="info.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="pwd">
        <el-input type="password" v-model="info.pwd"></el-input>
      </el-form-item>
      <el-form-item label="权限：" prop="roles">
        <el-select
          v-model="info.roles"
          multiple
          placeholder="请选择"
          class="block"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="handleSubmit('form')"
      >
        确定
      </el-button>
    </div>
  </zp-dialog>
</template>

<script>
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      roles: [
        { label: "超级管理员", value: "admin" },
        { label: "普通管理员", value: "default" },
      ],
      loading: false,
      dialogTableVisible: true,
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
        old_pwd: [{ required: true, message: "请填写原密码", trigger: "blur" }],
        pwd: [{ required: true, message: "请填写密码", trigger: "blur" }],
        roles: [
          {
            required: true,
            message: "请选择权限",
            trigger: "change",
            type: "array",
          },
        ],
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleSubmit(formName) {
      this.loading = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            delete this.info.createTime;
            delete this.info.releaseTime;
            await this.$store.dispatch("updateUser", this.info);
            this.loading = false;
            this.$message.success("编辑成功");
            this.close();
          } catch (e) {
            this.info.pwd = "";
            this.info.old_pwd = "";
            this.loading = false;
            this.$message.error("编辑失败");
          }
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
.el-form {
  .el-form-item {
    display: flex;
    align-items: center;
    /deep/ .el-form-item__label {
      min-width: 80px;
    }
    /deep/.el-form-item__content {
      margin-left: 0 !important;
      width: 260px;
      .el-select {
        width: 260px;
      }
    }
  }
}
</style> 