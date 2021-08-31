<template>
  <div class="article-list">
    <zp-page-list>
      <template v-slot:header>
        <span>管理员列表</span>
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
              placeholder="请输入用户名"
              v-model="searchForm.keyword"
              @keydown.enter.native="getUserList"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="getUserList"> 查询 </el-button>
        </el-form>
      </div>
      <!-- filter end -->
      <!-- list start -->
      <div slot="list">
        <zp-table-list
          :loading="listLoading"
          :source="userList"
          :count="userTotal"
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
          <template slot="roles" slot-scope="scope">
            <el-tag
              class="tag"
              type="primary"
              close-transition
              v-for="(tag, index) in scope.row.roles"
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
    <editDialog
      v-if="editShow"
      :info="userInfo"
      @close="handleClose"
    ></editDialog>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import editDialog from "./components/editDialog";
import { mapGetters } from "vuex";
export default {
  components: {
    editDialog,
  },
  computed: {
    ...mapGetters(["userList", "userTotal"]),
  },
  data() {
    return {
      listLoading: false,
      editShow: false,
      searchForm: {
        keyword: "",
      },
      userInfo: {},
      columns: [
        {
          label: "_id",
          prop: "_id",
          slot: "_id",
        },
        {
          label: "用户名",
          prop: "username",
        },
        {
          label: "权限",
          prop: "roles",
          slot: "roles",
        },
        {
          label: "操作",
          slot: "operate",
          width: "150",
        },
      ],
    };
  },
  mounted() {
    this.requestPageData = this.getUserList;
    this.getUserList();
  },

  methods: {
    async getUserList() {
      this.listLoading = true;
      try {
        await this.$store.dispatch("getUserList", {
          keyword: this.searchForm.keyword,
          pageindex: this.pageInfo.pageNum,
          pagesize: this.pageInfo.pageSize,
        });
        this.listLoading = false;
      } catch (e) {
        this.listLoading = false;
      }
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
    handleClose() {
      this.editShow = false;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$store.dispatch("delUser", row._id);
            this.$message.success("删除成功");
            this.getUserList();
          } catch (e) {
            this.$message.error("删除失败");
            console.log(e);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    handleEdit(row) {
      this.editShow = true;
      row.releaseTime = new Date(row.releaseTime);
      this.userInfo = row;
    },
  },
};
</script>

<style lang="less" scoped>
.tag {
  margin: 0 10px;
}
</style>
