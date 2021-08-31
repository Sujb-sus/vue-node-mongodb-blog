<template>
  <div class="permission-add">
    <zp-page-edit :back="true" @back="$router.back()">
      <div slot="header">
        {{ header }}
      </div>
      <el-form
        :model="info"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="form"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input type="text" v-model="info.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd">
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
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSubmit('form')"
            :loading="loading"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </zp-page-edit>
  </div>
</template>

<script>
export default {
  name: "permissionAdd",
  components: {},
  data() {
    return {
      header: "添加管理员",
      info: {
        username: "",
        pwd: "",
        avatar: "",
        roles: ["default"],
      },
      roles: [
        { label: "超级管理员", value: "admin" },
        { label: "普通管理员", value: "default" },
      ],
      loading: false,
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
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
    handleSubmit(formName) {
      this.loading = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$store.dispatch("addUser", this.info);
            this.loading = false;
            this.$router.push("/permission/list");
            this.$message.success("新增成功");
          } catch (e) {
            this.$message.error("新增失败");
            this.loading = false;
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
</style>