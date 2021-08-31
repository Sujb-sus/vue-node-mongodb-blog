<template>
  <div class="message-list">
    <zp-page-list>
      <template v-slot:header>
        <span>留言列表</span>
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
              placeholder="请输入内容、昵称"
              v-model="searchForm.keyword"
              @keydown.enter.native="getMessageList(true)"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="getMessageList(true)">
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
          :source="messageList"
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
          <template slot="content" slot-scope="scope">
            <div v-html="scope.row.content"></div>
          </template>
          <template slot="createTime" slot-scope="scope">
            {{ scope.row.createTime | formatTime("yyyy-MM-dd hh:mm:ss") }}
          </template>
          <template slot="operate" slot-scope="scope">
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
import { apiGetMessageList, apiDelMessage } from "src/api/message";
export default {
  name: "messageList",
  components: {},
  computed: {},
  data() {
    return {
      listLoading: false,
      searchForm: {
        keyword: "",
      },
      messageList: [],
      columns: [
        {
          label: "_id",
          prop: "_id",
          slot: "_id",
        },
        {
          label: "昵称",
          prop: "nickname",
        },
        {
          label: "头像颜色",
          prop: "headerColor",
        },
        {
          label: "评论内容",
          prop: "content",
          slot: "content",
          showTooltip: true,
        },
        {
          label: "时间",
          prop: "createTime",
          slot: "createTime",
        },
        {
          label: "点赞数",
          prop: "likes",
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
    this.requestPageData = this.getMessageList;
    this.getMessageList();
  },
  mounted() { },
  methods: {
    getMessageList() {
      let params = {
        keyword: this.searchForm.keyword,
        pageindex: this.pageInfo.pageNum,
        pagesize: this.pageInfo.pageSize,
      };
      this.listLoading = true;
      return apiGetMessageList(params)
        .then((res) => {
          let { list, total } = res.data;
          this.messageList = list;
          this.pageInfo.total = total;
        })
        .catch((err) => {
          this.listLoading = false;
          console.log(err);
        })
        .finally(() => {
          this.listLoading = false;
          this.hasLoad = true;
        });
    },
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
    handleDeleteMessage(id) {
      return apiDelMessage({ id })
        .then((res) => {
          this.$message.success("删除成功");
          this.getMessageList(true);
        })
        .catch((err) => {
          console.log(err);
          this.$message.info("删除失败");
        })
        .finally(() => { });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDeleteMessage(row._id);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  },
};
</script>


<style lang="less" scoped>
</style>
