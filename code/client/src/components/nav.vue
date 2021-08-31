<template>
  <div class="nav-wrapper" :class="{ 'not-nav': showNav }" ref="header">
    <nav>
      <img src="../images/logo.png" alt="WallBlog" />
      <ul>
        <li
          v-for="(item, index) in navList"
          :key="item.title"
          :class="{ active: currentIndex === index }"
          @click="goto(index, item.path)"
        >
          {{ item.title }}
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "navComponent",
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      currentIndex: -1,
      showNav: false,
      navList: [
        { title: "首页", path: "/index" },
        { title: "文章分类", path: "/label/all" },
        { title: "留言板", path: "/message" },
        { title: "关于我", path: "/myself" },
      ],
    };
  },
  watch: {},
  created() { },
  mounted() {
    document.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    goto(index, path) {
      this.currentIndex = index;
      this.$router.push(path);
    },
    onScroll() {
      const scrollTop =
        document.documentElement.scrollTop + document.body.scrollTop;
      this.showNav = scrollTop >= 120;
    },
  },
};
</script>

<style lang="less" scoped>
.nav-wrapper {
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 100;
  transition: all 1.2s ease;
  transform: translate3d(0, 0, 0);
  box-shadow: 0 1px 1px @cuttingLineColor;
  &.not-nav {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
  nav {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 98%;
      object-fit: contain;
    }
    ul {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      li {
        padding: 0 22px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @mainColor;
        &:hover {
          cursor: pointer;
          color: @highlightColor;
        }
      }
      .active {
        color: @highlightColor;
        position: relative;
        &::before {
          content: "";
          width: 67%;
          height: 4px;
          background-color: @highlightColor;
          position: absolute;
          top: 0;
        }
      }
    }
  }
}
</style>