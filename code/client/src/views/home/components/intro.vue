<template>
  <div class="intro-container">
    <div class="intro-box">
      <div class="intro-title">WALL BLOG</div>
      <div class="intro-desc">
        享受编程和技术所带来的快乐 – Coding Your Ambition
      </div>
    </div>
    <img src="../../../images/cloud-left.png" class="cloud-left" />
    <img src="../../../images/cloud-right.png" class="cloud-right" />
    <img src="../../../images/grass-confetti.png" class="grass-confetti" />
  </div>
</template>

<script>
export default {
  name: "bookCover",
  components: {},
  props: {},
  computed: {},
  data() {
    return {};
  },
  watch: {},
  created() { },
  mounted() { },
  beforeDestroy() { },
  methods: {},
};
</script>

<style lang="less" scoped>
.intro-container {
  background: linear-gradient(to bottom, #c6dde4, #fefeff);
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 240px;
  .intro-box {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 99;
    .intro-title {
      color: @thinColor;
      font-family: lato, sans-serif;
      font-size: 3.5em;
      letter-spacing: 10px;
      margin-top: 0;
      margin-bottom: 0;
      text-shadow: rgb(198, 221, 228) -1px -1px 1px,
        rgb(254, 254, 255) 1px 1px 1px;
      margin-bottom: 20px;
    }
    .intro-desc {
      color: @mainColor;
      font-size: 1em;
      font-weight: 400;
      padding: 0.2em 0;
      letter-spacing: 5px;
      text-transform: capitalize;
      margin-top: 0;
      margin-bottom: 0;
      text-shadow: rgb(198, 221, 228) -1px -1px 1px,
        rgb(254, 254, 255) 1px 1px 1px;
    }
  }
  img {
    position: absolute;
    bottom: 0;
    object-fit: contain;
    &.cloud-left {
      top: 0;
      left: 300px;
    }
    &.cloud-right {
      top: 0;
      right: 300px;
    }
  }
}
</style>
