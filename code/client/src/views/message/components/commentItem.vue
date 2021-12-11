<template>
  <div class="comment-main">
    <div class="side-title">
      <Icon name="icon-comment"></Icon>
      <span>{{ total }}</span
      >条评论， <span>{{ replyCount }}</span
      >条回复
    </div>
    <div
      class="comment-item"
      v-for="(item, index) in commentList"
      :key="item._id"
    >
      <div class="comment-part">
        <div class="item-img">
          <Icon name="icon-user03" :style="{ color: item.headerColor }"></Icon>
        </div>
        <div class="item-box">
          <div class="box-title">
            {{ item.nickname }}
            <span>{{ item.createTime | formatTime('yyyy-MM-dd hh:mm') }}</span>
          </div>
          <div class="box-content" v-html="item.content"></div>
          <div class="item-icon">
            <div
              class="box-icon"
              :class="{ 'icon-likes': getLikesColor(item._id) }"
              @click="handleLikes(item._id)"
            >
              <Icon name="icon-like02"></Icon>
              <span
                >{{ getLikesNumber(item._id, item.likes) | formatNumber() }}
              </span>
            </div>
            <div class="box-icon" @click="handleCilckReply(item)">
              <Icon name="icon-reply02"></Icon>
              <span>{{ getReplyBox(item._id) ? '取消' : '回复' }}</span>
            </div>
          </div>

          <comment-editor
            v-show="getReplyBox(item._id)"
            ref="editor"
            @submit="(val) => handleReply(val, index)"
          ></comment-editor>
        </div>
      </div>
      <template v-if="item.replyList && item.replyList.length">
        <reply-item
          v-for="(reply, index) in item.replyList"
          :key="reply._id + index"
          :byReplyUser="reply.byReplyUser"
          :replyContent="reply.replyContent"
          :replyTime="reply.replyTime"
          :replyHeaderColor="reply.replyHeaderColor"
          :replyUser="reply.replyUser"
        ></reply-item>
      </template>
    </div>
  </div>
</template>

<script>
import { apiUpdateLikes, apiUpdateReplys } from "api/message";
import CommentEditor from "./commentEditor";
import ReplyItem from "./replyItem";
import { colorList } from "src/constant/headerColor";
export default {
  name: "commentItem",
  components: { CommentEditor, ReplyItem },
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    replyCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getLikesNumber({ likeList }) {
      return (id, likes) => (likeList.includes(id) ? likes + 1 : likes);
    },
    getLikesColor({ likeList }) {
      return (id) => likeList.includes(id);
    },
    getReplyBox({ currentId, isReply }) {
      return (id) => currentId === id && isReply;
    },
  },
  data() {
    return {
      currentId: "", // 当前id
      byReplyUser: "", // 当前被回复用户
      isReply: false, // 是否回复
      likeList: [],
    };
  },
  watch: {},
  created() { },
  mounted() { },
  beforeDestroy() { },
  methods: {
    // 点赞
    handleLikes(id) {
      this.currentId = id;
      return apiUpdateLikes({ _id: id, isLike: this.likeList.includes(id) })
        .then(() => {
          this.likeList.includes(id)
            ? this.likeList.splice(this.likeList.indexOf(id), 1)
            : this.likeList.push(id);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
    },
    handleCilckReply(item) {
      this.currentId = item._id;
      this.byReplyUser = item.nickname;
      this.isReply = !this.isReply;
    },
    handleReply(reply, index) {
      let params = {
        _id: this.currentId,
        replyTime: new Date().getTime() + "",
        replyContent: reply.content,
        replyUser: reply.nickname,
        byReplyUser: this.byReplyUser,
        byReplyUser: this.byReplyUser,
        replyHeaderColor: colorList[Math.floor(Math.random() * 7)],
      };
      return apiUpdateReplys(params)
        .then(() => {
          this.$refs.editor[index].handleReset();
          this.isReply = false;
          this.likeList = [];
          this.$emit("success");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
    },
  },
};
</script>

<style lang="less" scoped>
.comment-main {
  padding: 0 32px;
  width: 80%;
  margin: 0 auto;
  box-shadow: 6px 6px 8px @shadowColor;
  border: 1px solid @shadowColor;
  border-radius: 24px;
  .side-title {
    font-size: 14px;
    margin-bottom: 30px;
    svg {
      font-size: 20px;
    }
    &::after {
      background: @warningColor;
      width: 19.5%;
    }
    &:hover {
      &::after {
        width: 100%;
      }
    }
    span {
      color: @warningColor;
      margin-right: 4px;
      font-weight: bold;
    }
  }
  .comment-item {
    position: relative;
    padding-bottom: 10px;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: @borderColor;
    }
    .comment-part {
      display: flex;
      align-items: flex-start;
      padding: 20px 0 10px;

      .item-img {
        padding-right: 16px;
        svg {
          font-size: 32px;
        }
        img {
          height: 42px;
          width: 42px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .item-box {
        flex: 1;
        .box-title {
          color: @mainColor;
          font-size: 14px;
          font-weight: bold;
          span {
            font-size: 12px;
            color: @borderBoldColor;
            font-weight: 500;
            box-shadow: 0 1px 2px @shadowColor;
            padding: 2px 4px;
          }
        }
        .box-content {
          font-size: 14px;
          color: @assistColor;
          line-height: 24px;
          margin-top: 6px;
        }
        .item-icon {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          cursor: pointer;
          .box-icon {
            display: flex;
            justify-content: flex-end;
            color: @assistColor;
            padding-left: 24px;
            svg {
              margin-right: 6px;
              font-size: 18px;
            }
            span {
              position: relative;
              top: 1px;
            }
          }
          .icon-likes {
            color: #dfa400;
          }
        }
      }
    }
  }
}
</style>
