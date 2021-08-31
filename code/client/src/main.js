import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import "./style/index.less";

import * as filters from "./filters";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
import "./utils/iconfont";
import "./components/common/index";

import { Loading } from "element-ui";
Vue.use(Loading.directive);

import VueLazyload from "vue-lazyload";
const loadimage = require("./images/loading.gif");
const errorimage = require("./images/load-error.jpeg");

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {},
}).$mount("#app");
