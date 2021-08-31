import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// 解决同一页面，参数不同的路由报错
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

/**
 * 加载模块
 * @param {string | Component} component 路径或组件
 * @param {boolean} lazy 是否懒加载
 * @returns {Function | object} 懒加载方法或组件对象
 */
const loadComponent = (component, lazy = true) =>
  lazy ? () => import(`views/${component}.vue`) : component;

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: "/index",
      component: loadComponent("home/index"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/label",
      component: loadComponent("home/label"),
      children: [
        {
          path: ":keyword",
          component: loadComponent("home/components/blogClassify"),
          meta: {
            title: "文章分类",
          },
        },
      ],
    },
    {
      path: "/article/detail",
      component: loadComponent("article/detail"),
      children: [
        {
          path: ":id",
          component: loadComponent("article/components/detailContent"),
          meta: {
            title: "文章详情",
          },
        },
      ],
    },
    {
      path: "/message",
      component: loadComponent("message/index"),
      meta: {
        title: "留言板",
      },
    },
    {
      path: "/myself",
      component: loadComponent("myself/index"),
      meta: {
        title: "关于我",
      },
    },
    {
      path: "*",
      redirect: "/index",
    },
  ],
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
