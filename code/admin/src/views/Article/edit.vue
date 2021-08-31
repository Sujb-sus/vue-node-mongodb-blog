<template>
  <div class="article-edit" v-show="hasLoad">
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
        <el-form-item label="文章类型：" prop="type">
          <el-select
            v-model="info.type"
            multiple
            clearable
            placeholder="请选择文章类型"
            class="block"
          >
            <el-option
              v-for="item in labelList"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题：" prop="title">
          <el-input type="text" v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="文章描述：" prop="desc">
          <el-input type="textarea" v-model="info.desc"></el-input>
        </el-form-item>
        <el-form-item label="文章封面：" prop="fileCoverImgUrl">
          <zp-single-img-upload v-model="info.fileCoverImgUrl" :public="true">
          </zp-single-img-upload>
        </el-form-item>
        <el-form-item
          label="文章内容："
          prop="markdown"
          v-if="info.markdown"
          class="markdown"
        >
          <Markdown v-model="info.markdown"></Markdown>
        </el-form-item>
        <el-form-item label="级别：" prop="album">
          <el-select
            v-model="info.level"
            placeholder="请选择级别"
            class="block"
          >
            <el-option
              v-for="item in [1, 2, 3, 4, 5, 6]"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源：" prop="source">
          <el-select
            v-model="info.source"
            placeholder="请选择来源"
            class="block"
          >
            <el-option
              v-for="item in sources"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Github：" prop="github">
          <el-input type="text" v-model="info.github"></el-input>
        </el-form-item>
        <el-form-item label="Auth：" prop="auth">
          <el-input type="text" v-model="info.auth"></el-input>
        </el-form-item>
        <el-form-item label="是否可见：" prop="isVisible" class="left-item">
          <el-switch v-model="info.isVisible"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSubmit('form')"
            :loading="loading"
            >更新</el-button
          >
        </el-form-item>
      </el-form>
    </zp-page-edit>
  </div>
</template>

<script>
import { apiUpdateBlog, apiGetBlogDetail } from "src/api/blog";
import { apiGetLabelList } from "src/api/label";
import { sources } from "src/constant/classify";
import Markdown from "components/markdown";
export default {
  name: "articleEdit",
  components: { Markdown },
  props: {},
  computed: {},
  data() {
    return {
      sources,
      header: "文章编辑",
      loading: false,
      hasLoad: false,
      labelList: [],
      info: {},
      id: "", // 文章id
      rules: {
        type: [
          {
            required: true,
            message: "请选择至少选择一个文章类型",
            trigger: "change",
            type: "array",
          },
        ],
        title: [{ required: true, message: "请填写文章标题", trigger: "blur" }],
        desc: [{ required: true, message: "请填写文章描述", trigger: "blur" }],
        markdown: [
          { required: true, message: "请填写文章内容", trigger: "blur" },
        ],
        fileCoverImgUrl: [
          { required: true, message: "请上传文章封面", trigger: "change" },
        ],
      },
    };
  },
  watch: {},
  async created() {
    this.id = this.$route.query["id"];
    await this.getLabelList();
    await this.getBlogDetail();

  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    handleSubmit(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.info.releaseTime = new Date().getTime() + "";
          this.info.html = this.info.markdown;
          this.handleUpdateBlog();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getBlogDetail() {
      return apiGetBlogDetail({ _id: this.id })
        .then((res) => {
          this.info = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.$message.info("获取文章详情失败");
        })
        .finally(() => {
          this.hasLoad = true;
        });
    },
    handleUpdateBlog() {
      return apiUpdateBlog(this.info)
        .then((res) => {
          this.$message.success("修改文章成功");
          this.$router.push("/article/list");
        })
        .catch((err) => {
          console.log(err);
          this.$message.info("修改文章失败");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getLabelList() {
      let params = {
        pageindex: 1,
        pagesize: 50,
      };
      return apiGetLabelList(params)
        .then((res) => {
          let { list } = res.data;
          this.labelList = list;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
        });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .markdown {
  .el-form-item__content {
    width: 1400px;
  }
}
</style>
