import Vue from "vue";
import App from "./App.vue";
import router from "./router/permission";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.less";
import pageInfoMixin from "src/mixins/pageInfo";

import "./utils/config/iconfont";
import "src/components/common/index.js";

import * as filters from "./filters";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.mixin(pageInfoMixin);
Vue.use(ElementUI);

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App },
});
