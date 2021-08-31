<template>
  <div class="label-list">
    <zp-page-list>
      <template v-slot:header>
        <span>标签列表</span>
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
              placeholder="请输入标签、背景色"
              v-model="searchForm.keyword"
              @keydown.enter.native="getLabelList"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="getLabelList"> 查询 </el-button>
        </el-form>
      </div>
      <!-- filter end -->
      <!-- list start -->
      <div slot="list">
        <zp-table-list
          :loading="listLoading"
          :source="labelList"
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
          <template slot="label" slot-scope="scope">
            <div
              class="label-box"
              :style="{ backgroundColor: scope.row.bgColor }"
            >
              {{ scope.row.label }}
            </div>
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
      :info="labelInfo"
      @close="handleClose"
    ></editDialog>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import editDialog from "./components/editDialog";
import { apiGetLabelList, apiDelLabel } from "src/api/label";
export default {
  components: {
    editDialog,
  },
  computed: {
  },
  data() {
    return {
      listLoading: false,
      editShow: false,
      searchForm: {
        keyword: "",
      },
      labelList: [],
      columns: [
        {
          label: "_id",
          prop: "_id",
          slot: "_id",
        },
        {
          label: "标签",
          prop: "label",
          slot: "label",
        },
        {
          label: "背景色",
          prop: "bgColor",
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
    this.requestPageData = this.getLabelList;
    this.getLabelList();
  },

  methods: {
    getLabelList() {
      let params = {
        keyword: this.searchForm.keyword,
        pageindex: this.pageInfo.pageNum,
        pagesize: this.pageInfo.pageSize,
      };
      this.listLoading = true;
      return apiGetLabelList(params)
        .then((res) => {
          let { list, total } = res.data;
          this.labelList = list;
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
            await this.handleDeleteLabel(row._id);;
          } catch (e) {
            this.$message.error("删除失败");
            console.log(e);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    handleDeleteLabel(id) {
      return apiDelLabel({ id })
        .then((res) => {
          this.$message.success("删除成功");
          this.getLabelList(true);
        })
        .catch((err) => {
          console.log(err);
          this.$message.info("删除失败");
        })
        .finally(() => { });
    },
    handleEdit(row) {
      this.editShow = true;
      this.labelInfo = row;
    },
  },
};
</script>

<style lang="less" scoped>
.label-box {
  color: #fff;
  padding: 4px 0;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  max-width: 150px;
}
</style>
