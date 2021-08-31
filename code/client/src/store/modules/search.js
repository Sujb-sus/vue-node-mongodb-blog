export default {
  namespaced: true,
  state: {
    keyword: "",
  },
  mutations: {
    setKeyword(state, data) {
      state.keyword = data;
    },
  },
  actions: {},
  getters: {
    keyword(state) {
      return state.keyword;
    },
  },
};
