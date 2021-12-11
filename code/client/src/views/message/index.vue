<template>
  <div class="home-wrapper" v-loading="loading">
    <div class="side-title">
      <Icon name="icon-message"></Icon>
      留言板
    </div>
    <div class="home-body">
      <comment-editor @submit="handleComment" ref="editor"></comment-editor>

      <comment-item
        v-if="total > 0"
        :commentList="commentList"
        ref="commentRef"
        :total="total"
        :replyCount="replyCount"
        @success="initData"
      ></comment-item>
      <none-data v-else-if="!total"></none-data>

      <Paging
        :page-index="pageindex"
        :total="total"
        :page-size="pagesize"
        @change="pageChange"
      ></Paging>
    </div>
  </div>
</template>
<script>
import CommentEditor from "./components/commentEditor";
import {
  apiAddMessage,
  apiGetMessageList,
  apiGetReplyCount,
} from "api/message";
import CommentItem from "./components/commentItem";
export default {
  name: "commentIndex",
  components: { CommentEditor, CommentItem },
  data() {
    return {
      loading: false,
      commentList: [],
      pageindex: 1,
      pagesize: 8,
      total: -1, // 评论数量
      replyCount: 0, // 回复数量
    };
  },
  props: {},
  computed: {},
  destroyed() { },
  mounted() {
    this.initData();
  },
  methods: {
    pageChange(page) {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      // 清空已点赞列表
      this.$refs.commentRef.likeList = [];
      this.pageindex = page;
      this.getMessageList();
    },
    initData() {
      this.loading = true;
      Promise.all([this.getMessageList(), this.getReplyCount()])
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleComment(params) {
      return apiAddMessage(params)
        .then(() => {
          this.$refs.editor.handleReset();
          this.$refs.commentRef.likeList = [];
          this.getMessageList();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
    },
    getMessageList() {
      let params = {
        pageindex: this.pageindex,
        pagesize: this.pagesize,
      };
      return apiGetMessageList(params)
        .then((res) => {
          let { list, total } = res.data;
          this.commentList = list;
          this.total = total;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
    },
    getReplyCount() {
      return apiGetReplyCount()
        .then((res) => {
          let { data } = res;
          this.replyCount = data[0].replyCount;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
    },
  },
};
</script>

<style scoped lang="less">
.home-body {
  background-color: #fff;
  flex-direction: column;
  padding-bottom: 24px;
}
.side-title {
  width: 1200px;
  background-color: #fff;
  margin: 20px auto 0;
  padding-left: 20px;
  &::after {
    width: 8.5%;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
}
.none-data-wrapper {
  width: 100%;
}
.paging-container {
  margin: 0 auto;
  padding-top: 24px;
}
</style>