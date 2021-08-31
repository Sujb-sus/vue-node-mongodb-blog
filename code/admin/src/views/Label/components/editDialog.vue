<template>
  <zp-dialog
    title="标签编辑"
    :visible.sync="dialogTableVisible"
    @close="close"
    width="480px"
    :destroy-on-close="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form :model="info" :rules="rules" ref="form">
      <el-form-item label="标签：" prop="label">
        <el-input type="text" v-model="info.label"></el-input>
      </el-form-item>
      <el-form-item label="背景色：" prop="bgColor">
        <el-input readonly :value="currentColor"></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 80px">
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
import { Sketch } from 'vue-color'
import { apiUpdateLabel } from "src/api/label";
export default {
  props: ["info"],
  components: {
    'sketch-picker': Sketch
  },
  data() {
    return {
      loading: false,
      dialogTableVisible: true,
      currentColor: '',
      rules: {
        label: [
          { required: true, message: "请填写标签名", trigger: "blur" },
        ],
        bgColor: [{ required: true, message: "请填写背景色", trigger: "blur" }],
      },
    };
  },
  created() {
    this.currentColor = this.info.bgColor;
  },
  methods: {
    // 颜色值改变事件处理
    colorValueChange(fmtObj) {
      // 取颜色对象的 rgba 值
      const { r, g, b, a } = fmtObj.rgba;
      this.currentColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      this.info.bgColor = this.currentColor;
    },
    close() {
      this.$emit("close");
    },
    handleSubmit(formName) {
      this.loading = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          return apiUpdateLabel(this.info)
            .then((res) => {
              this.$message.success("编辑成功");
              this.$emit("close");
            })
            .catch((err) => {
              console.log(err);
              this.$message.info("编辑失败");
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
.label-box {
  color: #fff;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  max-width: 150px;
}
</style> 