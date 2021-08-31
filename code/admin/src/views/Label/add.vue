<template>
  <div class="label-add">
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
        <el-form-item label="标签：" prop="label">
          <el-input type="text" v-model="info.label"></el-input>
        </el-form-item>
        <el-form-item label="背景色：" prop="bgColor">
          <el-input readonly :value="currentColor"></el-input>
        </el-form-item>
        <el-form-item>
          <sketch-picker
            v-model="currentColor"
            @input="colorValueChange"
          ></sketch-picker>
        </el-form-item>
        <el-form-item label="预览：" v-if="info.label">
          <div class="label-box" :style="{ backgroundColor: currentColor }">
            {{ info.label }}
          </div>
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
import { Sketch } from 'vue-color'
import { apiAddLabel } from "src/api/label";
export default {
  name: "permissionAdd",
  components: {
    'sketch-picker': Sketch
  },
  data() {
    return {
      header: "添加标签",
      info: {
        label: "",
        bgColor: "rgba(70, 70, 70, 0.9)",
      },
      currentColor: 'rgba(70, 70, 70, 0.9)',
      loading: false,
      rules: {
        label: [
          { required: true, message: "请填写标签", trigger: "blur" },
        ],
        bgColor: [{ required: true, message: "请填写背景色", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit(formName) {
      this.loading = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          return apiAddLabel(this.info)
            .then((res) => {
              this.$message.success("新增成功");
              this.$router.push("/label/list");
            })
            .catch((err) => {
              console.log(err);
              this.$message.info("新增失败");
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    // 颜色值改变事件处理
    colorValueChange(fmtObj) {
      // 取颜色对象的 rgba 值
      const { r, g, b, a } = fmtObj.rgba;
      this.currentColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      this.info.bgColor = this.currentColor;
    }
  },
};
</script>
<style lang="less" scoped>
.label-box {
  color: #fff;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  max-width: 150px;
}
</style>