/**
 * 注入公共组件
 */
import Vue from "vue";
// 检索当前目录的vue文件，便检索子文件夹
const componentsContext = require.context("./", true, /.vue$/);
componentsContext.keys().forEach((component) => {
  // 获取文件中的 default 模块
  const componentConfig = componentsContext(component).default;
  componentConfig.name && Vue.component(componentConfig.name, componentConfig);
});
