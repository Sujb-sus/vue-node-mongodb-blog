<template>
  <div class="reply-item">
    <Icon
      name="icon-user02"
      :style="{ color: replyHeaderColor }"
      class="item-img"
    ></Icon>
    <div class="reply-box">
      <div class="box-content">
        <div class="reply-user">
          <span class="reply-name">{{ replyUser }}</span>
          <span class="by-reply-name">@ {{ byReplyUser }}：</span>
        </div>
        <div v-html="replyContent" class="reply-content"></div>
      </div>
      <div class="reply-date">
        {{ replyTime | formatTime("yyyy-MM-dd hh:mm:ss") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "replyItem",
  components: {},
  props: {
    byReplyUser: {
      type: String,
      default: "",
    },
    replyContent: {
      type: String,
      default: "",
    },
    replyHeaderColor: {
      type: String,
      default: "",
    },
    replyTime: {
      type: String,
      default: "",
    },
    replyUser: {
      type: String,
      default: "",
    },
  },
  computed: {},
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.reply-item {
  background-color: @thinBgColor;
  padding: 10px 20px;
  margin-left: 42px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  .item-img {
    font-size: 32px;
    margin-right: 10px;
  }
  .reply-box {
    flex: 1;
    .box-content {
      .reply-user {
        font-size: 14px;
        line-height: 24px;
        .reply-name {
          color: @mainColor;
        }
        .by-reply-name {
          color: @warningColor;
        }
      }
      .reply-content {
        flex: 1;
        font-size: 14px;
        line-height: 24px;
        color: @thinColor;
      }
    }
    .reply-date {
      font-size: 12px;
      color: @borderBoldColor;
      margin-top: 2px;
      text-align: right;
    }
  }
}
</style>
