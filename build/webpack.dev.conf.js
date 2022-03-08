"use strict";
const webpack = require("webpack");
const path = require("path");
// 合并配置
const { merge } = require("webpack-merge");
// 配置需打包的html入口信息,并创建一个新的html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 编译提示
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 系统桌面通知
const notifier = require("node-notifier");

const isAdmin = process.env.NODE_ENV_TYPE === "admin";
// 开发环境配置参数
const devConf = isAdmin
  ? require("./config").admin.dev
  : require("./config").client.dev;
const baseConf = require("./webpack.base.conf");

const dev = merge(baseConf, {
  mode: "development",
  output: {
    filename: "[name]-[hash].js",
    // html引用资源路径,在dev-server中,引用的是内存中文件
    publicPath: devConf.publicPath,
  },
  module: {},
  // 生成sourceMap(方便调试)
  devtool: devConf.devtoolType,
  // 启动一个本地服务器,可进行本地开发
  devServer: {
    hot: true, // 热加载
    open: true, // 自动打开浏览器
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    host: devConf.host,
    port: devConf.port,
    proxy: devConf.proxyTable, // 配置反向代理解决跨域
    compress: true, // 压缩代码
    client: {
      // 在浏览器上全屏显示编译的errors
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // 忽略public下文件的监听
    static: {
      directory: path.join(__dirname, 'public'),
      watch: false,
    },
  },
  watchOptions: {
    ignored: ["**/.#*.vue", "node_modules/**"],
  },
  plugins: [
    // 开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: isAdmin ? "code/admin/index.html" : "code/client/index.html",
      inject: true,
    }),
    // 编译提示
    new FriendlyErrorsPlugin({
      // 编译成功
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${devConf.host}:${devConf.port}`,
        ],
      },
      // 编译出错
      onErrors: (severity, errors) => {
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        // 编译出错时,系统右下角弹出错误提示
        notifier.notify({
          title: "Webpack error",
          message: severity + ": " + error.name,
          subtitle: error.file || "",
        });
      },
      clearConsole: true, // 每次编译之间清除控制台
    }),
  ],
});
module.exports = dev;
