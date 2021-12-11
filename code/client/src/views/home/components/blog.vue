<template>
  <div class="blog-wrapper" v-loading="loading">
    <div class="blog-list" v-if="total > 0">
      <div v-for="item in blogList" :key="item._id" class="list-item">
        <div class="item-content">
          <div class="item-img">
            <img v-lazy="item.fileCoverImgUrl" @click="goto(item._id)" />
          </div>
          <div class="content-box">
            <div class="content-title" @click="goto(item._id)">
              {{ item.title }}
            </div>
            <div class="content-desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
        <div class="item-footer">
          <div class="item-func">
            <div class="func-box">
              <Icon name="icon-date02"></Icon>
              <div class="box-text">
                {{ item.releaseTime | formatTime('yyyy-MM-dd') }}
              </div>
            </div>
            <div
              class="func-box likes"
              :class="{ 'icon-likes': getLikesColor(item._id) }"
              @click="handleLikes(item._id)"
            >
              <Icon name="icon-like02"></Icon>
              <div class="box-text">
                {{ getLikesNumber(item._id, item.likes) | formatNumber() }}
              </div>
            </div>
            <div class="func-box">
              <Icon name="icon-browse02"></Icon>
              <div class="box-text">{{ item.pv | formatNumber() }}</div>
            </div>
            <div class="func-box">
              <Icon name="icon-label01"></Icon>
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
          <div class="item-read" @click="goto(item._id)">阅读全文>></div>
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
  mixins: [like, label],
  data() {
    return {
      loading: false,
      blogList: [],
      pageindex: 1,
      pagesize: 8,
      total: -1,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getBlogList();
  },
  mounted() {
  },
  methods: {
    goto(id) {
      this.$router.push({
        path: `/article/detail/${id}`,
        query: {
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
.blog-wrapper {
  width: 70%;
  margin-top: 20px;
  .blog-list {
    margin-bottom: 30px;

    .list-item {
      padding: 20px;
      border-radius: 12px;
      background-color: #fff;
      margin-bottom: 16px;
      position: relative;
      transition: box-shadow 0.4s;
      box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
      &:hover {
        box-shadow: 5px 15px 30px 5px rgba(0, 0, 0, 0.15);
      }
      &:hover .item-content .content-box .content-title {
        color: green;
      }
      &:hover img {
        transform: scale(1.2);
      }
      .item-content {
        display: flex;
        align-items: flex-start;
        .item-img {
          width: 240px;
          height: 160px;
          margin-right: 16px;
          overflow: hidden;
          img {
            width: 100%;
            border-radius: 6px;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            transition: all 0.4s linear;
          }
        }
        .content-box {
          flex: 1;
          .content-title {
            color: @thinColor;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            &:hover {
              cursor: pointer;
            }
            .ellipsis-line-clamp();
          }
          .content-desc {
            color: @assistColor;
            line-height: 28px;
            .ellipsis-line-clamp(4);
          }
        }
      }

      .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
        .item-func {
          display: flex;
          align-items: center;
          .func-box {
            display: flex;
            align-items: center;
            padding-right: 24px;
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
          .likes {
            &:hover {
              cursor: pointer;
            }
          }
          .icon-likes {
            color: #dfa400;
          }
        }
        .item-read {
          color: @thinHighlightColor;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>