/**
 * 1、先引入 pageInfo 的mixin文件，注入mixin
 * 2、给 requestPageData 方法赋值页面翻页查询方法
 */

export default {
  data() {
    return {
      requestPageData: null, // 每个table组建的数据源获取方法
      pageInfo: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  watch: {
    "pageInfo.pageNum"() {
      this.requestPageData && this.requestPageData();
    },
    "pageInfo.pageSize"() {
      this.requestPageData && this.requestPageData();
    },
  },
  methods: {
    handleCurrentChange(page) {
      this.pageInfo.pageNum = page;
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
    },
  },
};
