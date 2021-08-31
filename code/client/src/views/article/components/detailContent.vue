<template>
  <div class="detail-content" v-loading="loading">
    <div class="detail-body">
      <div class="detail-title">{{ blogInfo.title }}</div>
      <div class="detail-func">
        <div class="func-icon">
          <Icon name="icon-date02"></Icon>
          <div class="box-text">
            {{ blogInfo.releaseTime | formatTime("yyyy-MM-dd") }}
          </div>
        </div>
        <div class="func-icon">
          <Icon name="icon-browse02"></Icon>
          <div class="box-text">{{ blogInfo.pv | formatNumber() }}</div>
        </div>
        <div class="func-icon" v-if="blogInfo.auth">
          <Icon name="icon-laborer"></Icon>
          <div class="box-text">
            {{ blogInfo.auth }}
          </div>
        </div>
      </div>
      <div class="detail-main fmt" v-html="blogHtml"></div>
      <div class="detail-label">
        标签：
        <div
          class="box-text label-text"
          :style="{ backgroundColor: getLabelColor(label) }"
          v-for="label in blogInfo.type"
          @click="$router.push(`/label/${label}`)"
          :key="label"
        >
          {{ label }}
        </div>
      </div>
      <div class="detail-page" v-if="count > 2">
        <div class="page-common page-pre" @click="goto(preInfo._id)">
          上一篇&nbsp;&nbsp;&nbsp;&nbsp;<span> {{ preInfo.title }}</span>
        </div>
        <div class="page-common page-next" @click="goto(nextInfo._id)">
          <span>{{ nextInfo.title }}</span
          >&nbsp;&nbsp;&nbsp;&nbsp;下一篇
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetBlogList, apiUpdatePV } from "api/blog";
import label from "src/mixins/label";
export default {
  name: "detailContent",
  mixins: [label],
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      loading: false,
      blogHtml: "",
      id: "",
      blogInfo: {},
      preInfo: {},
      nextInfo: {},
      query: {},
      pageindex: 1,
      pagesize: 8,
      currentIndex: 0,
      count: 0,
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.id = to.params.id;
        this.query = to.query;
        this.updatePV();
        this.getBlogList();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    goto(id) {
      this.$router.push({ path: `/article/detail/${id}`, query: this.query });
    },
    getBlogList() {
      this.loading = true;
      return apiGetBlogList(this.query)
        .then((res) => {
          let { list } = res.data;
          this.count = list.length;
          this.blogInfo = list.filter((item, index) => {
            if (item._id === this.id) {
              this.currentIndex = index;
              return item;
            }
          })[0];
          this.blogHtml = this.blogInfo.html.replace(
            /<a /gi,
            `<a target='_blank'`
          );
          let preIndex = !this.currentIndex
            ? list.length - 1
            : this.currentIndex - 1;
          let nextIndex =
            this.currentIndex === list.length - 1 ? 0 : this.currentIndex + 1;
          this.preInfo = list[preIndex];
          this.nextInfo = list[nextIndex];
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updatePV() {
      return apiUpdatePV({ _id: this.id })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.detail-content {
  width: 70%;
  background-color: #fff;
  margin-top: 20px;
  padding: 24px;
  .detail-body {
    .detail-title {
      display: block;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: rgb(51, 51, 51);
    }
    .detail-func {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0 30px;
      position: relative;
      &::after {
        content: "";
        height: 1px;
        width: 100%;
        background-color: @cuttingLineColor;
        position: absolute;
        bottom: 20px;
      }

      .func-icon {
        color: @assistColor;
        display: flex;
        align-items: center;
        margin-right: 24px;
        .box-text {
          padding-left: 6px;
          position: relative;
          top: 1px;
        }
      }
    }
    .detail-main {
      margin-bottom: 50px;
    }
    .detail-label {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      color: @assistColor;
      svg {
        font-size: 18px;
      }
      .box-text {
        padding-left: 6px;
        position: relative;
        top: 2px;
      }
      .label-text {
        padding: 4px 10px;
        color: #fff;
        margin-left: 8px;
        border-radius: 12px;
        font-size: 14px;
        top: 0;
        cursor: pointer;
        &:hover {
          border-radius: 0;
          transition: 1s ease all;
        }
      }
    }
    .detail-page {
      display: flex;
      align-items: center;
      padding-top: 24px;
      position: relative;
      &::before {
        content: "";
        height: 1px;
        width: 100%;
        background-color: @cuttingLineColor;
        position: absolute;
        top: 0;
      }
      .page-common {
        color: @assistColor;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        span {
          color: @mainColor;
          font-weight: bold;
          font-size: 20px;
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .page-pre {
        padding-left: 16px;
        flex: 1;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          border-left: 1px solid @assistColor;
          border-bottom: 1px solid @assistColor;
          transform: rotate(45deg);
          position: absolute;
          top: 3px;
          left: 0;
        }
      }
      .page-next {
        text-align: right;
        padding-right: 16px;
        &::after {
          content: "";
          width: 10px;
          height: 10px;
          border-right: 1px solid @assistColor;
          border-top: 1px solid @assistColor;
          transform: rotate(45deg);
          position: absolute;
          top: 3px;
          right: 0;
        }
      }
    }
  }
}
</style>
