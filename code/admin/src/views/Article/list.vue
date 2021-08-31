<template>
  <div class="article-list">
    <zp-page-list>
      <template v-slot:header>
        <span>文章列表</span>
      </template>
      <!-- filter start -->
      <div slot="filter">
        <el-form
          ref="searchForm"
          class="zp-search-form"
          :inline="true"
          :model="searchForm"
        >
          <el-form-item label="关键词：" prop="keyword">
            <el-input
              placeholder="请输入类型、标题"
              v-model="searchForm.keyword"
              @keydown.enter.native="getBlogList(true)"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="getBlogList(true)">
            查询
          </el-button>
        </el-form>
      </div>
      <!-- filter end -->
      <!-- list start -->
      <div slot="list">
        <zp-table-list
          ref="sensitiveBehaviorRecordList"
          :loading="listLoading"
          :source="blogList"
          :count="pageInfo.total"
          :columns="columns"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <template slot="_id" slot-scope="scope">
            <el-button
              icon="el-icon-document-copy"
              type="primary"
              size="mini"
              class="clipboardBtn"
              :data-clipboard-text="scope.row._id"
              @click="handleCopyId"
              >复制
            </el-button>
          </template>
          <template slot="isVisible" slot-scope="scope">
            {{ scope.row.isVisible ? "是" : "否" }}
          </template>
          <template slot="fileCoverImgUrl" slot-scope="scope">
            <img
              :src="scope.row.fileCoverImgUrl"
              style="width: 60px; object-fit: contain"
            />
          </template>
          <template slot="source" slot-scope="scope">
            {{
              scope.row.source === 1
                ? "原创"
                : scope.row.source === 2
                ? "转载"
                : "翻译"
            }}
          </template>
          <template slot="releaseTime" slot-scope="scope">
            {{ scope.row.releaseTime | formatTime("yyyy-MM-dd hh:mm:ss") }}
          </template>
          <template slot="type" slot-scope="scope">
            <el-tag
              class="tag"
              type="primary"
              close-transition
              v-for="(tag, index) in scope.row.type"
              :key="index"
              >{{ tag }}</el-tag
            >
          </template>
          <template slot="operate" slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </zp-table-list>
      </div>
      <!-- list end -->
    </zp-page-list>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { apiGetBlogList, apiDelBlog } from "src/api/blog";
import { apiDelUploadImg } from "src/api/upload";
export default {
  name: "articleList",
  components: {},
  computed: {},
  data() {
    return {
      listLoading: false,
      searchForm: {
        keyword: "",
      },
      blogList: [],
      columns: [
        {
          label: "_id",
          prop: "_id",
          slot: "_id",
        },
        {
          label: "类型",
          prop: "type",
          slot: "type",
          showTooltip: true,
          width: "120",
        },
        {
          label: "标题",
          prop: "title",
          width: "160",
        },
        {
          label: "描述",
          prop: "desc",
          width: "160",
          showTooltip: true,
        },
        {
          label: "封面",
          slot: "fileCoverImgUrl",
          prop: "fileCoverImgUrl",
        },
        {
          label: "来源",
          prop: "source",
          slot: "source",
        },
        {
          label: "级别",
          prop: "level",
        },
        {
          label: "发布时间",
          prop: "releaseTime",
          slot: "releaseTime",
          width: "160",
        },
        {
          label: "是否可见",
          prop: "isVisible",
          slot: "isVisible",
        },
        {
          label: "作者",
          prop: "auth",
        },
        {
          label: "浏览量",
          prop: "pv",
        },
        {
          label: "点赞数",
          prop: "likes",
        },
        {
          label: "评论数",
          prop: "comments",
        },
        {
          label: "操作",
          slot: "operate",
          width: "150",
        },
      ],
    };
  },
  created() {
    this.requestPageData = this.getBlogList;
    this.getBlogList();
  },
  mounted() { },
  methods: {
    handleCopyId() {
      let clipboard = new Clipboard(".clipboardBtn");
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$message.error("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    getBlogList() {
      let params = {
        keyword: this.searchForm.keyword,
        pageindex: this.pageInfo.pageNum,
        pagesize: this.pageInfo.pageSize,
      };
      this.listLoading = true;
      return apiGetBlogList(params)
        .then((res) => {
          let { list, total } = res.data;
          this.blogList = list;
          this.pageInfo.total = total;
        })
        .catch((err) => {
          this.listLoading = false;
          console.log(err);
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    handleDeleteBlog(id) {
      return apiDelBlog({ id })
        .then((res) => {
          this.$message.success("删除成功");
          this.getBlogList(true);
        })
        .catch((err) => {
          console.log(err);
          this.$message.info("删除失败");
        })
        .finally(() => { });
    },
    // 删除本地图片
    handleDeleteImg(fileName) {
      return apiDelUploadImg({ fileName })
        .then((res) => { })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.handleDeleteBlog(row._id);
          let index = row.fileCoverImgUrl.lastIndexOf('/');
          let fileName = row.fileCoverImgUrl.substring(index + 1);
          this.handleDeleteImg(fileName);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    handleEdit(row) {
      this.$router.push({ path: "edit", query: { id: row._id } });
    },
  },
};
</script>


<style lang="less" scoped>
.tag {
  margin: 0 10px;
}
</style>
