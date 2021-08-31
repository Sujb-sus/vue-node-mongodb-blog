<template>
  <div class="zp-single-img-upload__container">
    <el-upload
      ref="upload"
      :action="action"
      :accept="accept"
      :file-list="fileList"
      :headers="headers"
      :data="data"
      list-type="picture-card"
      :auto-upload="true"
      :on-change="onChange"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
    >
      <div ref="triggerWrapper" class="zp-single-img-upload__trigger-wrapper">
        <slot v-if="this.$slots['trigger']" name="trigger"></slot>
        <i v-else slot="default" class="el-icon-plus"></i>
      </div>

      <div
        class="zp-single-img-upload__img-wrapper"
        slot="file"
        slot-scope="{ file }"
      >
        <el-image
          ref="zpSingleImg"
          class="zp-single-img-upload__img"
          v-if="imgUrl"
          :src="imgUrl"
          :preview-src-list="[imgUrl]"
          fit="contain"
        ></el-image>
        <span class="el-upload-list__item-actions" v-if="preview">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleDelete()">
            <i class="el-icon-delete"></i>
          </span>
        </span>
        <div class="zp-single-img-upload__reload" @click="handleReload" v-else>
          更换图片
        </div>
      </div>
      <div class="el-upload__tip" slot="tip">
        <slot v-if="this.$slots['tip']" name="tip"></slot>
        <div v-else>支持图片格式：jpg、png</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "utils/auth";

export default {
  name: "zpSingleImgUpload",
  props: {
    //图片url
    imgUrl: {
      type: String,
      default: "",
    },
    //图片上传接口地址
    action: {
      type: String,
      default: "/admin_api/uploadImage",
    },
    //支持的图片格式
    accept: {
      type: String,
      default: "image/*",
    },
    //文件最大大小（M）
    maxSize: {
      type: Number,
      default: 6,
    },
    //文件存储是否公有（公有存储读取的时候不需要签名，敏感文件私有，否则公有）
    public: {
      type: Boolean,
      default: false,
    },
    //是否可以预览图片
    preview: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "imgUrl",
    event: "input",
  },
  data() {
    return {
      headers: {}, //请求头
      data: {}, //请求额外参数
      fileList: [], //文件列表
      limitCount: 1, //最多支持个数
    };
  },
  watch: {
    imgUrl: {
      immediate: true,
      handler(val) {
        console.log("imgUrl:", val);
        if (val) {
          this.fileList = [{ url: val }];
        } else {
          this.fileList = [];
        }
      },
    },
  },
  computed: {},
  created() {
    this.headers["Token-Auth"] = getToken();
    if (this.public) {
      this.data["acl"] = "public-read";
    }
  },
  methods: {
    /**
     * 上传图片校验
     */
    beforeUpload(file) {
      let isIMG;
      const regList = this.accept.split(",");
      if (this.accept === "image/*") {
        isIMG = /image/i.test(file.type);
      } else {
        isIMG = regList.includes(file.type); // 是否符合类型
      }
      const isLt6M = file.size / 1024 / 1024 < this.maxSize;
      if (!isIMG) {
        this.fileList = [];
        this.$message.error("图片格式仅支持png、jpg，请更换图片!");
      }
      if (!isLt6M) {
        this.$message.error(`上传图片大小不能超过${this.maxSize}MB!`);
      }
      console.log("beforeUpload", file, isIMG && isLt6M);
      return isIMG && isLt6M;
    },
    /**
     * 文件修改
     */
    onChange(file, fileList) {
      console.log("onChange file:", file);
      console.log("onChange fileList:", fileList);
      const overMaxSize = file.size / 1024 / 1024 < this.maxSize;
      if (overMaxSize && fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      } else {
        this.fileList = [];
      }
    },
    /**
     * 上传成功
     */
    onSuccess(res, file, fileList) {
      console.log("onSuccess res:", res);
      console.log("onSuccess file:", file);
      console.log("onSuccess fileList:", fileList);
      const { data } = res;
      this.$emit("input", data.file);
    },
    /**
     * 删除
     */
    handleDelete() {
      console.log("handleDelete");
      this.$emit("input", "");
    },
    /**
     * 预览
     * @param file
     */
    handlePictureCardPreview(file) {
      this.$refs.zpSingleImg.clickHandler();
    },
    handleReload() {
      this.$refs.triggerWrapper.click();
    },
  },
};
</script>

<style lang="less" scoped>
.zp-single-img-upload__container {
  display: inline-block;
  width: 148px;
  margin-right: 16px;
  /deep/ .el-upload {
    border: 1px dashed #d8dce5;
  }
  /deep/ .el-upload-list__item {
    border: 1px solid #d8dce5;
  }
  .zp-single-img-upload__img-wrapper {
    height: 100%;
    .zp-single-img-upload__img {
      height: 100%;
      width: 100%;
    }
  }

  .zp-single-img-upload__reload {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(51, 51, 51, 0.8);
    color: #fff;
    font-size: 12px;
    cursor: pointer;
  }

  /deep/ .el-upload-list {
    position: absolute;
  }
}
</style>
