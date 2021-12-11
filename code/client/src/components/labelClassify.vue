<template>
  <div class="label-container">
    <div class="side-title">
      <Icon name="icon-label"></Icon>
      标签分类
    </div>
    <div class="label-content">
      <div
        class="label-item"
        v-for="item in labelList"
        :key="item.label"
        :style="{ backgroundColor: item.bgColor }"
      >
        <router-link :to="`/label/${item.label}`">
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "labelClassify",
  components: {},
  props: {},
  computed: {
    ...mapGetters({ labelList: "label/labelList" }),
  },
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
.label-container {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 6px 6px 8px @shadowColor;
  .label-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
    .label-item {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
      color: #fff;
      margin: 5px;
      border-radius: 12px;
      transition: 1s ease all;
      position: relative;
      box-shadow: 4px 4px 8px gainsboro;

      &:hover {
        border-radius: 0;
        cursor: pointer;
      }
      a {
        color: #fff;
      }
    }
  }
}
</style>
