<template>
  <div class="comment-editor" ref="container">
    <div class="input-wrapper">
      <input-box
        ref="inputBox"
        @keyup.enter.ctrl.exact.native="handlerSubmit"
        v-model="inputContent"
        placeholder="说点什么吧......"
        class="input-box"
      >
      </input-box>
    </div>
    <div class="footer-action">
      <emoji-picker
        trigger-pick="click"
        @activated="$refs.inputBox.focus()"
        @selected="handlerEmojiSelected"
      ></emoji-picker>
      <input
        type="text"
        placeholder="你的昵称"
        v-model="nickname"
        maxlength="10"
      />
      <span class="submit-tiptext">Ctrl + Enter</span>
      <div
        @click="handlerSubmit"
        class="submit-button"
        :disabled="!inputContent"
      >
        提交
      </div>
    </div>
  </div>
</template>
<script>
import InputBox from "./inputBox";
import EmojiPicker from "./emojiPicker";
import { colorList } from "src/constant/headerColor";
export default {
  name: "comment-editor",
  components: { InputBox, EmojiPicker },
  data() {
    return {
      inputContent: "",
      nickname: "",
    };
  },
  props: {},
  computed: {},
  destroyed() { },
  mounted() { },
  methods: {
    handlerSubmit() {
      if (!this.inputContent) {
        return false;
      }
      let params = {
        content: this.inputContent,
        nickname: this.nickname,
        createTime: new Date().getTime() + "",
        headerColor: colorList[Math.floor(Math.random() * 7)],
      };
      this.$emit("submit", params);
    },
    handlerEmojiSelected(e) {
      this.$refs.inputBox.focus();
      const clonedNode = e.target.cloneNode(true);
      clonedNode.style.verticalAlign = "text-top";
      document.execCommand("insertHTML", false, clonedNode.outerHTML);
    },
    handleReset() {
      this.$refs.inputBox.reset();
      this.inputContent = "";
      this.nickname = "";
    },
  },
};
</script>

<style scoped lang="less">
.comment-editor {
  width: 100%;
  padding: 24px 48px;
  .input-wrapper {
    &.inline {
      display: flex;
      .input-box {
        flex: 1;
        margin-right: 14px;
      }
    }
  }
  .footer-action {
    margin-top: 16px;
    display: flex;
    align-items: center;
    input {
      margin-left: auto;
      margin-right: 24px;
      height: 32px;
      border: none;
      border: 1px solid @borderBoldColor;
      border-radius: 20px;
      padding-left: 12px;
      outline: none;
      box-shadow: 4px 3px 3px @shadowColor;
      &::placeholder {
        color: @borderBoldColor;
      }
    }
    .submit-tiptext {
      margin-right: 4px;
      font-size: 14px;
      color: @borderBoldColor;
    }
    .submit-button {
      align-self: flex-end;
      transition: all 0.2s;
      background: #409eff;
      border-radius: 4px;
      display: inline-block;
      cursor: pointer;
      padding: 6px 10px;
      color: white;
      user-select: none;
      &.button-enter,
      &.button-leave-to {
        // zoom:0;
        margin-left: -40px;
        transform: scale(0, 0);
      }
      &[disabled] {
        cursor: not-allowed;
        background: #66b1ff;
      }
      &:hover {
        background: #66b1ff;
      }
      &:not([disabled]):active {
        background: #3a8ee6;
      }
    }
  }
}
</style>