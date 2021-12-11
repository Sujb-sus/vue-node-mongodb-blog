<template>
  <div class="myself-container">
    <div class="header-bg">
      <img class="img-avatar" src="../images/avatar.png" />
      <img class="img-bg" src="../images/bg4.jpg" />
    </div>
    <div class="my-body">
      <div class="my-name">wall | 苏s哈</div>
      <div class="my-job">Web前端工程师</div>
      <div class="my-desc">
        一个热爱篮球与前端技术的95后！20年入行，
        热衷于研究Web前端技术，一边工作一边积累经验，分享一些自己整理的笔记和优选文章。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myself",
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
.myself-container {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 6px 6px 8px @shadowColor;
  .header-bg {
    height: 150px;
    border-radius: 4px;
    position: relative;
    .img-avatar {
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -50px;
      left: calc(~'50% - 50px');
      border-radius: 50%;
      z-index: 99;
      &:hover {
        animation: btnGroups 1s linear;
      }
    }
    .img-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .my-body {
    margin-top: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .my-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .my-job {
      font-size: 14px;
      color: @thinHighlightColor;
    }
    .my-desc {
      font-size: 14px;
      color: @assistColor;
      padding: 20px 40px;
      line-height: 26px;
    }
  }
}
</style>
