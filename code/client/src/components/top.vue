<template>
  <div class="top-wrapper" v-show="showTop" @click="goTop">
    <img src="../images/back-top.png" alt="Top" />
  </div>
</template>

<script>
export default {
  name: "top",
  components: {},
  props: {},
  computed: {
    showTop() {
      return this.scrollTop > 300;
    },
  },
  data() {
    return {
      scrollTop: 0,
    };
  },
  watch: {},
  created() { },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    });
  },
  beforeDestroy() { },
  methods: {
    goTop() {
      let back = setInterval(() => {
        if (document.documentElement.scrollTop || document.body.scrollTop) {
          document.documentElement.scrollTop -= 80;
          document.body.scrollTop -= 80;
        } else {
          clearInterval(back);
        }
      }, 20);
    },
  },
};
</script>

<style lang="less" scoped>
.top-wrapper {
  img {
    position: fixed;
    bottom: 120px;
    right: 120px;
    width: 80px;
    object-fit: contain;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
