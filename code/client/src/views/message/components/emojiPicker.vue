<template>
  <div
    @keyup.esc="hidePicker"
    ref="container"
    class="emoji-wrapper"
    hidefocus="true"
    v-on="handleMouse()"
  >
    <span class="emoji-button" @click.stop="togglePickerVisibility">
      <img
        :class="{ inactive: !pickerVisible }"
        class="button-icon"
        src="../../../images/emoji/icon.svg"
        width="20"
        height="20"
        alt
      />
      <span v-if="buttonTextVisible" class="button-text">表情</span>
    </span>
    <ul :class="['emoji-picker', pickerPosition]" v-if="pickerVisible">
      <li v-for="(url, key) in files" :key="key" class="emoji-picker-item">
        <img
          class="emoji-icon"
          @click="handlerSelect"
          width="20"
          height="20"
          :src="url"
          alt
        />
      </li>
    </ul>
  </div>
</template>
<script>
const requireEmoji = require.context("../../../images/emoji");
let files = requireEmoji.keys();
export default {
  data() {
    return {
      pickerVisible: false,
      files: files.map((url) =>
        require(`../../../images/emoji/${url.slice(2)}`)
      ),
    };
  },
  props: {
    buttonTextVisible: {
      type: Boolean,
      default: true,
    },
    triggerPick: {
      tyep: String,
      default: "hover",
      validator(value) {
        return ["hover", "click"].includes(value);
      },
    },
    pickerPosition: {
      type: String,
      default: "right",
      validator(value) {
        return ["left", "middle", "right"].includes(value);
      },
    },
  },
  watch: {
    pickerVisible(newValue) {
      newValue ? this.$emit("activated") : this.$emit("inactivated");
    },
  },
  mounted() {
    const docHandleClick = (this.docHandleClick = (e) => {
      if (!this.$refs.container.contains(e.target)) {
        this.hidePicker();
      }
    });
    const handleKeyup = (this.handleKeyup = (e) => {
      if (e.key === "Escape") {
        this.hidePicker();
      }
    });
    document.addEventListener("click", docHandleClick);
    document.addEventListener("keyup", handleKeyup);
  },
  destroyed() {
    document.removeEventListener("click", this.docHandleClick);
    document.removeEventListener("click", this.handleKeyup);
  },
  methods: {
    handlerSelect(e) {
      this.$emit("selected", e);
    },
    hidePicker() {
      this.pickerVisible = false;
    },
    togglePickerVisibility() {
      if (this.triggerPick === "click") {
        this.pickerVisible = !this.pickerVisible;
      }
    },
    handleMouse() {
      const mouseenter = function () {
        this.pickerVisible = true;
      }.bind(this);
      const mouseleave = function () {
        this.pickerVisible = false;
      }.bind(this);
      if (this.triggerPick === "hover") {
        return {
          mouseenter,
          mouseleave,
        };
      } else {
        return {};
      }
    },
  },
};
</script>


<style scoped lang="less">
.emoji-picker {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
}
.emoji-picker-item {
  margin: 4px;
  cursor: pointer;
  img {
    user-select: none;
  }
}
.emoji-wrapper {
  position: relative;
  display: inline-block;
  z-index: 1000;
}
.emoji-button {
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  .button-icon {
    margin-right: 6px;
    &.inactive {
      filter: grayscale(100%);
    }
  }
  &:hover {
    color: #027fff;
  }
  .button-text {
    vertical-align: super;
  }
}
.emoji-picker {
  background: #fff;
  box-shadow: @borderBoldColor 1px 1px 7px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  position: absolute;
  &.left {
    right: 0;
  }
  &.middle {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>