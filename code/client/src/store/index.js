import Vue from "vue";
import Vuex from "vuex";
import label from "./modules/label";
import search from "./modules/search";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    label,
    search,
  },
});

export default store;
