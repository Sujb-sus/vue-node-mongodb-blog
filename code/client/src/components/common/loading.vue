<!-- PCloading -->
<template>
  <div class="spinner">
    <div class="circle"></div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  components: {},
  props: {},
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
.circle {
  margin: 20px auto;
  width: 100px;
  height: 100px;
  border: 5px white solid;
  border-left-color: #ff5500;
  border-right-color: #0c80fe;
  border-radius: 100%;
  animation: loading 1s infinite linear;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>