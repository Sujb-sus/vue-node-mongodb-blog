<template>
  <div class="side-article" v-loading="loading">
    <div class="side-title">
      <Icon
        :name="sideClassify === BROWSE_STATUS ? 'icon-hot' : 'icon-recommend'"
      ></Icon>
      {{ sideType[sideClassify] }}
    </div>
    <div class="side-list">
      <div class="list-item" v-for="(item, index) in blogList" :key="item._id">
        <div class="item-title" @click="goto(item._id)">
          <div
            :style="{ backgroundColor: getActiveColor(index) }"
            class="index"
            v-show="sideClassify === BROWSE_STATUS"
          >
            {{ index + 1 }}
          </div>
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="item-content">
          <div class="item-img">
            <img v-lazy="item.fileCoverImgUrl" />
          </div>
          <div class="item-right">
            <div class="item-desc">
              {{ item.desc }}
            </div>
            <div class="item-func">
              <div class="func-box">
                <Icon name="icon-date02"></Icon>
                <div class="box-text">
                  {{ item.releaseTime | formatTime('yyyy-MM-dd') }}
                </div>
              </div>
              <div class="func-box">
                <Icon name="icon-browse02"></Icon>
                <div class="box-text">{{ item.pv | formatNumber() }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetBlogList } from "api/blog";
import { sortType, sideType, BROWSE_STATUS } from "src/constant/side";
export default {
  name: "sideArticle",
  components: {},
  props: {
    sideClassify: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    getActiveColor() {
      return (index) => (index < 3 ? "#FF6701" : "#b1b1b1");
    },
  },
  data() {
    return {
      sideType,
      BROWSE_STATUS,
      loading: false,
      blogList: [],
      pageindex: 1,
      pagesize: 5,
      total: 0,
    };
  },
  watch: {},
  created() {
    this.getBlogList();
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    goto(id) {
      this.$router.push({
        path: `/article/detail/${id}`,
        query: {
          sortBy: sortType[this.sideClassify],
          pageindex: this.pageindex,
          pagesize: this.pagesize,
        },
      });
    },
    getBlogList() {
      let params = {
        sortBy: sortType[this.sideClassify],
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
.side-article {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 6px;
  box-shadow: 6px 6px 8px @shadowColor;
  .side-list {
    padding: 10px;
    .list-item {
      border-bottom: solid 1px @borderColor;
      font-size: 14px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      &:hover .item-title .title {
        color: @mainColor;
      }
      &:hover .item-content .item-right .item-desc {
        color: @mainColor;
      }
      &:hover .item-content .item-right .item-func .func-box {
        color: @mainColor;
      }
      &:hover img {
        transform: scale(1.2);
      }
      .item-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
        .index {
          color: #fff;
          font-size: 12px;
          margin-right: 4px;
          font-weight: normal;
          width: 16px;
          height: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title {
          font-size: 14px;
          color: @thinColor;
          font-weight: bold;
          .ellipsis-line-clamp();
        }
      }
      .item-content {
        display: flex;
        align-items: flex-start;
        .item-img {
          width: 100px;
          height: 70px;
          margin-right: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            transition: 0.4s ease all;
            object-fit: cover;
          }
        }
        .item-right {
          flex: 1;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-desc {
            color: @assistColor;
            line-height: 24px;
            .ellipsis-line-clamp(2);
          }
          .item-func {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            .func-box {
              display: flex;
              align-items: center;
              padding-left: 24px;
              color: @assistColor;
              .box-text {
                padding-left: 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
