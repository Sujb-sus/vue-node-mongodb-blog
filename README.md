# wallBlog

一款简约的个人博客系统

wallBlog 线上地址：[http://www.rasblog.com](http://www.rasblog.com)

## 主要功能

### 客户端

- 文章功能：文章内容支持`Markdown`语法且代码高亮展示；
- 标签功能：通过标签分类来检索文章数据；
- 侧边栏功能：点击排行、站长推荐和标签分类等；
- 搜索功能：通过关键词检索文章的标题和摘要，并支持搜索高亮；
- 留言功能：可点赞、回复评论，统计评论以及回复总数，支持`Emoji`表情；
- 其他功能：图片懒加载、分页、侧边栏吸顶以及一键置顶等；

### 管理端

- 权限管理：CRUD 管理员，可分配权限；
- 文章管理：CRUD 文章，文章封面支持本地上传、文章内容支持`Markdown`语法编辑；
- 标签管理：CRUD 标签，标签背景色支持用`Vue-Color`插件自定义选择；
- 留言管理：RD 评论以及回复；

## 项目结构

![项目结构](./static/project-structure.png)

## 技术应用

- 前端：`Vue`、`Element-UI`、`ES6`、`Webpack`、`Less`、`Axios`、`Markdown-Editor`、`Highlight`、`Vue-Color`、`Vue-Lazyload`等；
- 后端：`Node`、`Koa2`、`Jwt`、`MongoDB`、`Busboy`、`Log4`、`Node-Notifier`、`Ora`、`Chalk`、`Rimraf`等；
- 运维：`宝塔 Linux 面板`、`Nginx`、`PM2管理工具`等；

## 注意事项：

1. 项目启动前，需要在本地安装好`MongoDB`服务，请自行安装；
2. 启动本地的 `mongo` 服务，开始给数据库初始化一些必要数据；

- 数据库名可自行修改，但是需要跟`code/server/config.js`文件同步上；
- 登录管理后台时，需要给数据库创建`users`集合，并注册一个账号进行登录；

```
> mongo // 开启mongo服务
> show dbs // 显示数据库列表
> use wallBlog // 新建一个wallBlog数据库
> db.createUser({user:"wall",pwd:"123456",roles:[{role:"readWrite",db:'wallBlog'}]}) // 在wallBlog数据库创建一个wall用户，密码为123456
> show users // 展示该库有哪些用户
> db.auth("wall", "123456"); // 数据库认证一下用户、密码
> db.users.insert({  // 往该库的users集合插入一条数据，账号：admin  密码：123456
    "pwd" : "e10adc3949ba59abbe56e057f20f883e",
    "username" : "admin",
    "roles" : [
        "admin"
    ]
})
> show collections // 查询该库下的集合（类似于mysql的表）
> db.users.find() // 查询users集合下的所有数据
```

3. 初始化好本地的`MongoDB`数据库，就可以在`code/server/config.js`文件下配置账号、密码以及数据库名称；
4. `npm run dev:server`开启后台接口服务；
5. `npm run dev:admin`启动管理后台界面，用上面注册的账号密码登录，并录入文章数据；
6. `npm run dev:client`启动客户端页面；

## 脚本命令

本项目是基于 Webpack5.5 来构建与打包的。

- npm run dev:admin // 本地开发管理端页面
- npm run dev:client // 本地开发客户端页面
- npm run build:admin // 项目打包 - 管理端
- npm run build:client // 项目打包 - 客户端
- npm run analyz // 查看打包信息
- npm run server // 启动后台接口服务

## 参考目录

- vue-node-blog 开源项目：[https://github.com/cd-dongzi/vue-node-blog](https://github.com/cd-dongzi/vue-node-blog)

