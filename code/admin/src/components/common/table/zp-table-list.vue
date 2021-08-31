<!--
table 配置项：
1. loading
2. source: 数据list
3. count: 数据总数
4. columns: 列配置
    同el-table-column 属性
    补充:
        1. zpMark: 特殊几个字段固定宽度，具体查看 @zpAdmin/utils/config/styleConfig
        2. slot: 自定义列名
5. leftFix: 左侧固定列栏数
6. rightFix: 右侧固定列栏数
7. pageable: 是否显示分页
8. pageSize: 默认每页条数
9. layout: 分页配置

事件：
1. sizeChange: 分页切换 | 参数: { pageNo, pageSize }
2. selectChange: 多选切换 | 参数: 同element table
 -->
<template>
  <div class="zp-table-list">
    <el-table
      ref="table"
      v-loading="loading"
      :stripe="stripe"
      :data="source"
      :row-key="rowKey"
      :show-header="showHeader"
      :empty-text="loading ? ' ' : '暂无数据'"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <template v-for="(column, columnKey) in columns">
        <template v-if="column.type">
          <template v-if="column.type === 'selection'">
            <!-- 选择栏固定宽度 -->
            <el-table-column
              type="selection"
              width="55"
              :show-overflow-tooltip="column.showTooltip"
              :align="column.align"
              :key="columnKey"
              :reserve-selection="column.reserveSelection"
              :selectable="
                column.selectable
                  ? column.selectable
                  : () => {
                      return true;
                    }
              "
            ></el-table-column>
          </template>
        </template>

        <template v-else>
          <el-table-column
            :type="column.type"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="getWidth(column)"
            :fixed="getFixed(columnKey)"
            :class-name="column.className"
            :min-width="column.minWidth"
            :render-header="column.renderHeader"
            :show-overflow-tooltip="column.showTooltip"
            :align="column.align"
            :header-align="column.headerAlign"
            :label-class-name="column.labelClassName"
            :formatter="column.formatter"
            :sortable="column.sortable || false"
          >
            <template v-if="column.slotHeader" slot="header">
              <slot :name="column.slotHeader"></slot>
            </template>
            <template slot-scope="scope">
              <!-- 自定义列: 比如操作列 start -->
              <slot
                v-if="column.slot"
                :name="column.slot"
                :$index="scope.$index"
                :column="scope.column"
                :row="scope.row"
              ></slot>
              <!-- 自定义列: 比如操作列 end -->
              <template v-else>
                <template v-if="column.formatter">
                  {{ column.formatter(scope.row, column) }}
                </template>

                <template v-else>
                  {{ scope.row[column.prop] }}
                </template>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <el-pagination
      v-if="pageable && count > 0"
      @size-change="(value) => handleSizeChange(value)"
      @current-change="(value) => handleCurrentChange(value)"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="currentPageSize"
      :layout="pageLayout"
      :total="count"
    ></el-pagination>
  </div>
</template>
<script>
import { tableFixWidths } from "src/utils/config/styleConfig";

export default {
  name: "zpTableList",
  data() {
    return {
      page: 1,
      currentPageSize: 20,
      pageSizes: [10, 20, 30, 50],
      pageLayout: "",
    };
  },
  props: {
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 是否斑马纹
    stripe: {
      type: Boolean,
      default: true,
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 数据资源
    source: {
      type: Array,
      default: () => [],
    },
    // 列配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 列表总数量
    count: {
      type: Number,
      default: 0,
    },
    // 左侧固定列栏数
    leftFix: {
      type: Number,
      default: 1,
    },
    // 右侧固定列栏数
    rightFix: {
      type: Number,
      default: 1,
    },
    // 是否分页
    pageable: {
      type: Boolean,
      default: true,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 分页组件布局
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    rowKey: [String, Function],
  },
  watch: {
    count: {
      handler(value) {
        // 解决查询列表，分页器页码没同步更新问题
        if (value === 0) {
          this.page = 1;
        }
      },
    },
    pageSize: {
      handler(value) {
        value && (this.currentPageSize = value);
      },
      immediate: true,
    },
    layout: {
      handler(value) {
        value && (this.pageLayout = value);
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    doLayout() {
      this.$refs.table.doLayout();
    },
    handleSortChange(value) {
      console.log(value);
      this.$emit("sort-change", value);
    },
    /**
     * 选择操作
     * @param value
     */
    handleSelectionChange(value) {
      this.$emit("selection-change", value);
    },
    /**
     * 当前页码变化
     * @param val
     */
    handleCurrentChange(val) {
      this.page = val;
      this.$emit("current-change", val);
    },
    /**
     * 每页数量变化
     * @param val
     */
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.$emit("size-change", val);
    },
    // 是否固定
    getFixed(columnKey) {
      if (columnKey < this.leftFix) {
        return "left";
      } else if (columnKey > this.columns.length - this.rightFix - 1) {
        return "right";
      }
      return false;
    },
    // 宽度
    getWidth(column) {
      // 1. 优先 zpMark 固定宽度项
      // 2. width属性
      // 3. 不设宽度
      if (column.zpMark) {
        if (Object.keys(tableFixWidths).includes(column.zpMark)) {
          return tableFixWidths[column.zpMark];
        }
      }
      if (column.width) {
        return column.width;
      }
      return "";
    },
  },
};
</script>
<style lang="less" scope>
.zp-table-list {
  .el-table {
    .el-button--text {
      padding: 0 2px;
    }

    .el-tag {
      height: 24px;
      line-height: 22px;
      border-radius: 12px;
    }
  }

  .el-table__fixed,
  .el-table__fixed-right {
    &:before {
      background-color: transparent;
    }
  }
}
</style>
<style lang="less" scoped>
.zp-table-list {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-pagination {
    text-align: right;

    .el-pagination__total {
      float: left;
    }
  }
}
</style>
