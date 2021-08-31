import store from "../store";
import { getToken } from "src/utils/auth";
import { router } from "./index";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (!store.state.user.roles) {
      // 重新拉取用户信息
      store.dispatch("getUserInfo").then((res) => {
        // 如果token过期，则需重新登录
        if (res.code === 401) {
          next("/login");
        } else {
          let roles = res.data.roles;
          store.dispatch("setRoutes", { roles }).then(() => {
            // 根据权限动态添加路由
            router.addRoutes(store.state.permission.addRouters);
            next({ ...to }); // hash模式  确保路由加载完成
          });
        }
      });
    } else {
      next();
    }
  } else {
    to.path === "/login" ? next() : next("/login");
  }
});
router.afterEach((to, from) => {
  document.title = to.name;
  NProgress.done();
});

export default router;
