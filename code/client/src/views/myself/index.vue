<template>
  <div class="home-wrapper">
    <div class="side-title">
      <Icon name="icon-me"></Icon>
      关于我
    </div>
    <div class="home-body">
      <div class="myself-main">
        <div class="main-desc">
          <p>95后，20年入行...</p>
          <p>福建泉州人，现居深圳...</p>
          <p>写博客主要是为了学习，顺带分享...</p>
          <p>目前技术水平尚浅，正在持续努力学习中...</p>
          <p>比起编程当程序员，其实我更想当个体育老师哈哈哈...</p>
          <p>但：“既然选择干这行，那就干下去”！将此当成一个信念，向前迈进...</p>
        </div>
        <img class="main-img" src="../../images/wall.jpeg" />
        <div class="main-footer">
          + 本博客是采用 Vue2.5 + Node15.14.0 + Mongodb4.2.0
          前后端完全分离模式来搭建，具体的技术栈可在 GitHub 上了解。后续可能会用
          Vue3.0 来重构一版，敬请期待！！！🌟🌟🌟
          <br />
          + 本博客已开源，源码已上传到
          GitHub。如果觉得该博客对你学习有帮助的，请能给博主点个 Star。
          如果有不清楚的地方，欢迎邮箱来信交流。感谢各位国家栋梁的支持！！！🙏🙏🙏
        </div>
      </div>
      <div class="side-main">
        <div class="side-wrapper">
          <div class="side-img">
            <img src="../../images/avatar.png" class="avatar" alt="" />
          </div>
          <div class="side-content">
            <div class="content-item">网名：苏s哈 | wall</div>
            <div class="content-item">职业：Web前端工程师</div>
            <div class="content-item">个人微信：SJB854067626</div>
            <div class="content-item">邮箱：854067626@qq.com</div>
          </div>
        </div>
        <div class="side-wrapper">
          <div class="side-title">
            <Icon name="icon-wetchat"></Icon>
            个人微信
          </div>
          <div class="side-img">
            <img src="../../images/qrcode.jpg" class="qrcode" alt="" />
          </div>
        </div>
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
.home-body {
  background-color: #fff;
}
.side-title {
  width: 1200px;
  background-color: #fff;
  margin: 20px auto 0;
  padding-left: 20px;
  &::after {
    width: 8.4%;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
}
.myself-main {
  width: 70%;
  padding: 24px;
  border-right: 1px solid @borderColor;
  .main-desc {
    font-size: 14px;
    line-height: 32px;
    color: @thinColor;
  }
  .main-img {
    margin-top: 10px;
    max-height: 300px;
    object-fit: contain;
  }
  .main-footer {
    background: @thinBgColor;
    padding: 10px;
    text-align: left;
    line-height: 32px;
    margin: 20px auto;
    color: #0609308a;
  }
}
.side-main {
  flex: 1;
  .side-wrapper {
    margin-top: 24px;
    .side-title {
      width: 92%;
      margin: 0;
      padding-left: 0;
      svg {
        font-size: 24px;
      }
      &::after {
        width: 10%;
      }
      &:hover {
        &::after {
          width: 100%;
        }
      }
    }
    .side-img {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .qrcode {
        width: 80%;
        height: 80%;
        border-radius: 6px;
        margin-top: 24px;
      }
    }
    .side-content {
      .content-item {
        width: 92%;
        padding: 5px 10px;
        margin: 5px 0;
        border-radius: 5px;
        font-size: 14px;
        color: @thinColor;
        background-color: @thinBgColor;
      }
    }
  }
}
</style>
