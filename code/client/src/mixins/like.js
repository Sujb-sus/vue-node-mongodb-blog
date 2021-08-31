// 点赞操作

import { apiUpdateLikes } from "api/blog";
export default {
  computed: {
    getLikesNumber({ likeList }) {
      return (id, likes) => (likeList.includes(id) ? likes + 1 : likes);
    },
    getLikesColor({ likeList }) {
      return (id) => likeList.includes(id);
    },
  },
  data() {
    return {
      currentId: "", // 当前id
      isLike: false, // 是否点赞
      likeList: [],
    };
  },
  methods: {
    // 点赞
    handleLikes(id) {
      if (this.likeList.includes(id)) {
        this.isLike = true;
        this.likeList.splice(this.likeList.indexOf(id), 1);
      } else {
        this.isLike = false;
        this.likeList.push(id);
      }
      this.currentId = id;
      return apiUpdateLikes({ _id: id, isLike: this.isLike })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
  },
};
