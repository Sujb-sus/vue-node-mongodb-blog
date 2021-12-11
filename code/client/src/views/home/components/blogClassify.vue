<template>
  <div class="blog-classify" v-loading="loading">
    <div class="list-title">
      <Icon name="icon-label01"></Icon>
      <span v-html="getTitle"></span>
    </div>

    <div class="blog-list" v-if="total > 0">
      <div class="list-item" v-for="item in blogList" :key="item._id">
        <div class="item-img">
          <img v-lazy="item.fileCoverImgUrl" @click="goto(item._id)" />
        </div>
        <div class="item-title" v-html="getKeywordHighlight(item.title)"></div>
        <div class="item-desc" v-html="getKeywordHighlight(item.desc)"></div>
        <div class="item-label">
          <div class="label-title">标签：</div>
          <div class="label-box">
            <div
              class="box-text label-text"
              :style="{ backgroundColor: getLabelColor(label) }"
              v-for="label in item.type"
              @click="$router.push(`/label/${label}`)"
              :key="label"
            >
              {{ label }}
            </div>
          </div>
        </div>
        <div class="item-footer">
          <div class="footer-text" @click="goto(item._id)">+ 文章阅读</div>
          <div class="footer-box">
            <div
              class="footer-icon likes"
              @click="handleLikes(item._id)"
              :class="{ 'icon-likes': getLikesColor(item._id) }"
            >
              <Icon name="icon-like02"></Icon>
              <div class="box-text">
                {{ getLikesNumber(item._id, item.likes) | formatNumber() }}
              </div>
            </div>
            <div class="footer-icon">
              <Icon name="icon-browse02"></Icon>
              <div class="box-text">{{ item.pv | formatNumber() }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NoneData v-else-if="!total"></NoneData>

    <Paging
      :page-index="pageindex"
      :total="total"
      :page-size="pagesize"
      @change="pageChange"
    ></Paging>
  </div>
</template>

<script>
import { apiGetBlogList } from "api/blog";
import like from "src/mixins/like";
import label from "src/mixins/label";
export default {
  name: "blogClassify",
  components: {},
  props: {},
  mixins: [like, label],
  computed: {
    getTitle({ isQuery, keyword, total }) {
      return keyword
        ? `${isQuery ? "搜索关键词" : "标签分类"} 
        “<font color="#f75353"> ${keyword} </font>” 的结果，共${total}篇`
        : `全部文章，共${total}篇`;
    },
    // 当选择标签分类时，不展示高亮
    getKeywordHighlight({ isQuery, keyword }) {
      return (value) =>
        isQuery && value.includes(keyword)
          ? value.replace(
            new RegExp(keyword, "g"),
            `<font color="#f75353">${keyword}</font>`
          )
          : value;
    },
  },
  data() {
    return {
      loading: false,
      blogList: [],
      pageindex: 1,
      pagesize: 6,
      total: -1,
      isQuery: "", // 用来区分是搜索框、标签搜索场景
      keyword: "",
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        // 清空已点赞列表
        this.likeList = [];
        this.isQuery = to.query.search;
        this.keyword = to.params.keyword;
        this.keyword = this.keyword === "all" ? "" : this.keyword;
        this.getBlogList();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    goto(id) {
      this.$router.push({
        path: `/article/detail/${id}`,
        query: {
          keyword: this.keyword,
          pageindex: this.pageindex,
          pagesize: this.pagesize,
        },
      });
    },
    pageChange(page) {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      // 清空已点赞列表
      this.likeList = [];
      this.pageindex = page;
      this.getBlogList();
    },
    getBlogList() {
      let params = {
        keyword: this.keyword,
        isQuery: this.isQuery,
        pageindex: this.pageindex,
        pagesize: this.pagesize,
      };
      this.loading = true;
      return apiGetBlogList(params)
        .then((res) => {
          let { list, total } = res.data;
          this.blogList = list;
          this.total = total;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.blog-classify {
  width: 70%;
  background-color: #fff;
  margin-top: 20px;
  padding-bottom: 30px;
  .list-title {
    color: @mainColor;
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 10px;
    background-color: #f7f7f7;
    font-size: 18px;
    position: relative;
    &::after {
      content: ' ';
      position: absolute;
      height: 2px;
      width: 4%;
      left: 0;
      bottom: -1px;
      background: @mainColor;
      transition: 2s ease all;
    }
    &:hover {
      &::after {
        width: 100%;
      }
    }
    span {
      margin-left: 6px;
      letter-spacing: 1px;
    }
  }
  .blog-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 24px 40px;
    .list-item {
      width: 33.3%;
      height: 384px;
      padding: 20px;
      border-bottom: 1px solid #eee;
      border-left: 1px solid #eee;
      position: relative;

      transition: box-shadow 0.4s;
      box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
      &:hover {
        box-shadow: 5px 15px 30px 5px rgba(0, 0, 0, 0.15);
      }
      &:hover img {
        transform: scale(1.2);
      }
      &:hover .item-footer .footer-text {
        color: green;
      }
      .item-img {
        height: 160px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.5s ease;
        }
      }
      .item-title {
        display: block;
        width: 100%;
        color: @thinColor;
        line-height: 24px;
        margin: 14px 0 6px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-desc {
        color: @assistColor;
        line-height: 22px;
        font-size: 14px;
        .ellipsis-line-clamp(3);
      }
      .item-label {
        display: flex;
        align-items: center;
        position: absolute;
        max-width: 220px;
        bottom: 54px;
        color: @assistColor;
        .label-title {
          min-width: 48px;
        }
        .label-box {
          flex: 1;
          display: flex;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .box-text {
            padding-left: 6px;
            position: relative;
            top: 2px;
          }
          .label-text {
            padding: 4px 8px;
            color: #fff;
            margin-right: 8px;
            border-radius: 12px;
            font-size: 12px;
            top: 0;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              border-radius: 0;
              transition: 1s ease all;
            }
          }
        }
      }
      .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 20px;
        bottom: 20px;
        width: 84%;
        .footer-text {
          color: @thinHighlightColor;
          cursor: pointer;
        }
        .footer-box {
          display: flex;
          align-items: center;
          .footer-icon {
            color: @assistColor;
            display: flex;
            align-items: center;
            margin-left: 24px;
            .box-text {
              padding-left: 6px;
              position: relative;
              top: 1px;
            }
          }
          .likes {
            cursor: pointer;
          }
          .icon-likes {
            color: #dfa400;
          }
        }
      }
    }
  }
}
</style>
