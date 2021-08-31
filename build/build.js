"use strict";

process.env.NODE_ENV = "production";
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.prod.conf");
const compiler = webpack(config);
// 以包的形式包装rm -rf命令，删除文件夹
const rm = require("rimraf");
// 美化node控制台进度
const ora = require("ora");
const spinner = ora({
  text: "building for production loading...",
  color: "yellow",
  spinner: { interval: 80, frames: ["-", "+", "-"] },
});
// 开启loading动画
spinner.start();
// 美化控制台输出
const chalk = require("chalk");
const isAdmin = process.env.NODE_ENV_TYPE === "admin";
// 打包前先删除之前可能已打包过的文件
const rmFile = path.resolve(
  __dirname,
  `../puclic/${isAdmin ? "admin" : "client"}`
);

rm(rmFile, (rmErr) => {
  if (rmErr) throw rmErr;
  compiler.run((err, stats) => {
    spinner.stop();
    if (err) {
      throw err;
    }
    if (stats.hasErrors()) {
      console.log(chalk.redBright("Build failed with errors.\n"));
      process.exit(1);
    }
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + "\n\n"
    );
    console.log(chalk.greenBright("Build completed with success.\n"));

    compiler.close((closeErr) => {
      if (closeErr) {
        console.log(
          chalk.redBright(
            `compiler close failed with message ${closeErr.message}`
          )
        );
      }
    });
  });
});
