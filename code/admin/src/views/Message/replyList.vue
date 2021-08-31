<template>
  <div class="reply-list">
    <zp-page-list>
      <template v-slot:header>
        <span>回复列表</span>
      </template>

      <!-- list start -->
      <div slot="list">
        <zp-table-list
          ref="sensitiveBehaviorRecordList"
          :loading="listLoading"
          :source="replyList"
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
          <template slot="replyContent" slot-scope="scope">
            <div v-html="scope.row.replyContent"></div>
          </template>
          <template slot="replyTime" slot-scope="scope">
            {{ scope.row.replyTime | formatTime("yyyy-MM-dd hh:mm:ss") }}
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
import { apiGetMessageList, apiDelReply } from "src/api/message";
export default {
  name: "replyList",
  components: {},
  computed: {},
  data() {
    return {
      listLoading: false,
      searchForm: {
        keyword: "",
      },
      messageList: [],
      replyList: [],
      columns: [
        {
          label: "留言_id",
          prop: "_id",
          slot: "_id",
        },
        {
          label: "回复用户",
          prop: "replyUser",
        },
        {
          label: "被回复用户",
          prop: "byReplyUser",
        },
        {
          label: "头像颜色",
          prop: "replyHeaderColor",
        },
        {
          label: "回复内容",
          prop: "replyContent",
          slot: "replyContent",
          showTooltip: true,
        },
        {
          label: "回复时间",
          prop: "replyTime",
          slot: "replyTime",
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
          let { list } = res.data;
          this.messageList = list;
          this.replyList = this.messageList
            .map((item) => item.replyList)
            .flat();
          this.pageInfo.total = this.replyList.length;
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
    handleDeleteReply(_id) {
      return apiDelReply({ _id })
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
          this.handleDeleteReply(row._id);
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
