"use strict";
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 以link标签形式，抽离出css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isAdmin = process.env.NODE_ENV_TYPE === "admin";
const isProd = process.env.NODE_ENV === "prod";
const prodConf = isAdmin
  ? require("./config").admin.build
  : require("./config").client.build;
// 拼接路径
const resolve = (dir) => {
  return path.join(__dirname, "..", dir);
};
// 资源路径
const assetsPath = (dir) => {
  return path.posix.join(prodConf.assetsPath, dir);
};

module.exports = {
  entry: {
    app: [
      isAdmin
        ? resolve("code/admin/src/main.js")
        : resolve("code/client/src/main.js"),
      "babel-polyfill",
    ],
  },
  // 配置模块如何被解析
  resolve: {
    //自动解析文件扩展名(补全文件后缀)(从左->右)
    extensions: [".js", ".vue", ".json"],
    // 配置别名映射
    alias: {
      vue$: "vue/dist/vue.esm.js",
      src: isAdmin ? resolve("code/admin/src") : resolve("code/client/src"),
      components: isAdmin
        ? resolve("code/admin/src/components")
        : resolve("code/client/src/components"),
      style: isAdmin
        ? resolve("code/admin/src/styles")
        : resolve("code/client/src/style"),
      views: isAdmin
        ? resolve("code/admin/src/views")
        : resolve("code/client/src/views"),
      store: isAdmin
        ? resolve("code/admin/src/store")
        : resolve("code/client/src/store"),
      api: isAdmin
        ? resolve("code/admin/src/api")
        : resolve("code/client/src/api"),
      utils: isAdmin
        ? resolve("code/admin/src/utils")
        : resolve("code/client/src/utils"),
    },
  },
  plugins: [
    // 引用vue-loader时必须确保引入该plugin
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath("css/[name].[chunkhash].css"),
      chunkFilename: assetsPath("css/[name].[chunkhash].css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: isAdmin
          ? resolve("code/admin/src")
          : resolve("code/client/src"),
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        include: isAdmin
          ? resolve("code/admin/src")
          : resolve("code/client/src"),
      },
      {
        test: /\.css$/,
        use: [
          !isProd
            ? { loader: "vue-style-loader" }
            : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
        ],
      },
      // 开发环境使用vue-style-loader可以重载样式模块
      {
        test: /\.less$/,
        use: [
          !isProd
            ? { loader: "vue-style-loader" }
            : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "less-loader" },
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.resolve(__dirname, "../styles/theme.less"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
};
