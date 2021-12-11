// 点赞操作

import { apiUpdateLikes } from 'api/blog';
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
      likeList: [],
    };
  },
  methods: {
    // 点赞
    handleLikes(id) {
      return apiUpdateLikes({ _id: id, isLike: this.likeList.includes(id) })
        .then(() => {
          this.likeList.includes(id)
            ? this.likeList.splice(this.likeList.indexOf(id), 1)
            : this.likeList.push(id);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
  },
};
