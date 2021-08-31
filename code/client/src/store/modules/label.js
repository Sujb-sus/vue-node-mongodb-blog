import { apiGetLabelList } from "src/api/label";
export default {
  namespaced: true,
  state: {
    labelList: null,
  },
  mutations: {
    setLabelList(state, data) {
      state.labelList = data;
    },
  },
  actions: {
    getLabelList(context) {
      let params = {
        pageindex: 1,
        pagesize: 50,
      };
      return apiGetLabelList(params)
        .then((res) => {
          let { list } = res.data;
          context.commit("setLabelList", list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    labelList(state) {
      return state.labelList;
    },
  },
};
