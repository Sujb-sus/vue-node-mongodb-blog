"use strict";
const path = require("path");
const webpack = require("webpack");
// 合并配置
const { merge } = require("webpack-merge");
// 配置需打包的html入口信息,并创建一个新的html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 压缩js
const TerserPlugin = require("terser-webpack-plugin");
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 开启Gzip压缩,nginx需要配置
const CompressionPlugin = require("compression-webpack-plugin");

const isAdmin = process.env.NODE_ENV_TYPE === "admin";
// 生产环境配置参数
const prodConf = isAdmin
  ? require("./config").admin.build
  : require("./config").client.build;
const baseConf = require("./webpack.base.conf");
// 资源路径
const assetsPath = (dir) => {
  return path.posix.join(prodConf.assetsSubDirectory, dir);
};

const prod = merge({}, baseConf, {
  mode: "production",
  output: {
    // build后所有文件存放的位置
    path: path.resolve(__dirname, `../public/${isAdmin ? "admin" : "client"}`),
    // html引用资源路径,可在此配置cdn引用地址
    publicPath: prodConf.publicPath,
    filename: assetsPath("js/[name].[chunkhash].js"),
    // 用于打包require.ensure(代码分割)方法中引入的模块
    chunkFilename: assetsPath("js/[name].[chunkhash].js"),
  },
  module: {},
  optimization: {
    moduleIds: "deterministic", // 被哈希转化成的小位数值模块名
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false, // 删除注释
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }, // 删除注释
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000, // 形成一个新代码块最小的体积
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: "~", // 打包分割符
      cacheGroups: {
        // 打包第三方库
        vendors: {
          name: `chunk-vendors`,
          test: /[/]node_modules[/]/,
          priority: -10, // 优先级
          chunks: "initial",
        },
        // 打包其余的的公共代码
        common: {
          name: `chunk-common`,
          minChunks: 2, // 引入两次及以上被打包
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    // 作用域提升,提升代码在浏览器执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: isAdmin ? "code/admin/index.html" : "code/client/index.html",
      inject: true,
      minify: {
        removeComments: true, // 删除html注释
        collapseWhitespace: true, // 去除空格
        removeRedundantAttributes: true, // 删除多余的属性
      },
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
// 项目打包后，进行性能分析
if (process.env.analyz_npm_config_report) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  prod.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prod;
