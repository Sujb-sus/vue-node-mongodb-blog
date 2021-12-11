<template>
  <div type="text" class="input-box-wrapper">
    <div
      class="content textarea"
      ref="richText"
      v-on="listeners"
      v-bind="$attrs"
      :contenteditable="true"
    ></div>
    <div class="append-wrapper">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "input-box",
  props: {},
  data() {
    return {};
  },
  computed: {
    listeners() {
      return Object.assign({}, this.$listeners, {
        input: function (e) {
          const inputContent = e.target.innerHTML;
          this.$emit("input", inputContent);
        }.bind(this),
      });
    },
  },
  mounted() { },
  methods: {
    focus() {
      this.$refs.richText.focus();
    },
    reset() {
      this.$refs.richText.innerHTML = "";
    },
  },
};
</script>

<style scoped lang="less">
.input-box-wrapper {
  position: relative;
}
.content {
  max-height: 200px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &.textarea {
    min-height: 100px;
  }
  &.text {
    min-height: 80px;
  }
  &:empty:before {
    content: attr(placeholder);
    color: @borderBoldColor;
    position: absolute;
    left: 12px;
    top: 8px;
  }
  &.focused {
    border: #66b1ff 1px solid;
    cursor: text;
  }
  &:focus {
    outline: none;
  }
  border: 1px solid @shadowColor;
  box-shadow: 4px 3px 3px @shadowColor;
  border-radius: 12px;
  padding: 7px 10px;
  padding-right: 30px;
  position: relative;
}
.append-wrapper {
  position: absolute;
  right: 1px;
  top: 1px;
  bottom: 1px;
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style>