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

export const constantRouterMap = [
  {
    path: "/login",
    name: "登录",
    component: loadComponent("Login/index"),
    hidden: true,
  },
  {
    path: "/",
    name: "首页",
    component: loadComponent("Layout/index"),
    redirect: "/home",
    icon: "home",
    children: [
      { path: "home", component: loadComponent("Home/index"), name: "首页" },
    ],
  },
];
export const asyncRouterMap = [
  {
    path: "/permission",
    name: "权限管理",
    meta: { role: ["admin"] },
    component: loadComponent("Layout/index"),
    redirect: "/permission/list",
    requireAuth: true, // 是否需要登录
    dropdown: true,
    icon: "authority",
    children: [
      {
        path: "list",
        component: loadComponent("Permission/list"),
        name: "管理员列表",
      },
      {
        path: "add",
        component: loadComponent("Permission/add"),
        name: "添加管理员",
      },
    ],
  },
  {
    path: "/article",
    name: "文章管理",
    component: loadComponent("Layout/index"),
    redirect: "/article/list",
    dropdown: true,
    icon: "article",
    children: [
      {
        path: "list",
        component: loadComponent("Article/list"),
        name: "文章列表",
      },
      {
        path: "edit",
        component: loadComponent("Article/edit"),
        name: "文章编辑",
        hidden: true,
      },
      {
        path: "add",
        component: loadComponent("Article/add"),
        name: "添加文章",
      },
    ],
  },
  {
    path: "/label",
    name: "标签管理",
    component: loadComponent("Layout/index"),
    redirect: "/label/list",
    dropdown: true,
    icon: "label",
    children: [
      {
        path: "list",
        component: loadComponent("Label/list"),
        name: "标签列表",
      },
      {
        path: "add",
        component: loadComponent("Label/add"),
        name: "添加标签",
      },
    ],
  },
  {
    path: "/message",
    name: "留言管理",
    component: loadComponent("Layout/index"),
    redirect: "/message/list",
    dropdown: true,
    icon: "message",
    children: [
      {
        path: "list",
        component: loadComponent("Message/list"),
        name: "留言列表",
      },
      {
        path: "reply",
        component: loadComponent("Message/replyList"),
        name: "回复列表",
      },
    ],
  },
];

export const router = new Router({
  // mode: 'history',
  routes: constantRouterMap,
});
