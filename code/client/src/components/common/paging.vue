<template>
  <div class="paging-container" v-if="total > 0">
    <ul class="mo-paging">
      <li
        :class="[
          'paging-item',
          'paging-item--defalut',
          { 'paging-item--disabled': index === 1 },
        ]"
        @click="prev"
      >
        < Prev
      </li>
      <li
        :class="[
          'paging-item',
          'paging-item--defalut',
          { 'paging-item--disabled': index === 1 },
        ]"
        @click="first"
      >
        First
      </li>

      <li :class="['paging-item', 'paging-item--more']" v-if="showPrevMore">
        ...
      </li>

      <li
        v-for="pager in pagers"
        :key="pager"
        :class="[
          'paging-item',
          { 'paging-item--current': pageIndex === pager },
        ]"
        @click="go(pager)"
      >
        {{ pager }}
      </li>

      <li :class="['paging-item', 'paging-item--more']" v-if="showNextMore">
        ...
      </li>
      <li
        :class="[
          'paging-item',
          'paging-item--defalut',
          { 'paging-item--disabled': index === pages },
        ]"
        @click="last"
      >
        Last
      </li>
      <li
        :class="[
          'paging-item',
          'paging-item--defalut',
          { 'paging-item--disabled': index === pages },
        ]"
        @click="next"
      >
        Next >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: {
    //页面中的可见页码，其他的以...替代, 必须是奇数
    perPages: {
      type: Number,
      default: 5,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //计算总页码
    pages() {
      return Math.ceil(this.size / this.limit);
    },
    //计算页码，当count等变化时自动计算
    pagers() {
      const array = [];
      const perPages = this.perPages;
      const pageCount = this.pages;
      let current = this.index;
      const _offset = (perPages - 1) / 2;

      const offset = {
        start: current - _offset,
        end: current + _offset,
      };

      //-1, 3
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start);
        offset.start = 1;
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount);
        offset.end = pageCount;
      }
      if (offset.start < 1) offset.start = 1;

      this.showPrevMore = offset.start > 1;
      this.showNextMore = offset.end < pageCount;

      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i);
      }
      return array;
    },
  },
  watch: {
    pageIndex(val) {
      this.index = val || 1;
    },
    pageSize(val) {
      this.limit = val || 10;
    },
    total(val) {
      this.size = val || 1;
    },
  },
  data() {
    return {
      index: this.pageIndex, //当前页码
      limit: this.pageSize, //每页显示条数
      size: this.total || 1, //总记录数
      showPrevMore: false,
      showNextMore: false,
    };
  },
  methods: {
    prev() {
      if (this.index > 1) {
        this.go(this.index - 1);
      }
    },
    next() {
      if (this.index < this.pages) {
        this.go(this.index + 1);
      }
    },
    first() {
      if (this.index !== 1) {
        this.go(1);
      }
    },
    last() {
      if (this.index !== this.pages) {
        this.go(this.pages);
      }
    },
    go(page) {
      if (this.index !== page) {
        this.index = page;
        this.$emit("change", this.index);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.paging-container {
  display: flex;
  justify-content: center;
  .mo-paging {
    display: flex;
    align-items: center;
    .paging-item {
      font-size: 14px;
      padding: 6px 16px;
      margin-left: 10px;
      cursor: pointer;
      color: gray;
      border-radius: 4px;
      box-sizing: border-box;
      box-shadow: 0 0 10px @shadowColor;
      &:hover {
        box-sizing: border-box;
        color: #fff !important;
        background: rgba(32, 178, 170, 0.7);
        border-color: transparent;
      }
      &.paging-item--defalut {
        color: rgba(32, 178, 170, 0.7);
        margin-left: 10px;
      }
      &.paging-item--disabled,
      &.paging-item--more {
        color: #959da5;
        pointer-events: none;
      }
      &.paging-item--current {
        background: rgba(32, 178, 170, 0.7);
        color: #fff;
        border-color: transparent;
        position: relative;
        z-index: 1;
        border: none;
      }
    }
  }
}
</style>
