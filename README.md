### 前言

权当学习、巩固 React/TypeScript 等技术。

### 技术栈

```
React17 + react-hook + TS4 + react-router + react-query + css in js + msw + antd
```

### 使用项目

```
1.克隆项目：      git clone https://github.com/citcen/flickering-jira.git
2.安装依赖：      npm install
3.启动服务：      npm start
```

### 功能

- [x] 登录/注册
- [x] 退出登录
- [x] 项目列表
- [x] 项目收藏
- [x] 看板列表
- [x] 任务列表
- [x] 项目/看板增删改
- [x] 看板/任务拖拽排序
- [x] 任务组详情
- [x] 添加任务组
- [x] name 模糊查询
- [x] url 管理页面参数
- [x] 乐观更新 optimistic-updates
- [x] 当组件还未挂载或卸载时，不再执行此组件的 fetch 请求回调
- [x] Mock service worker 数据接口模拟
- [x] 管理异步请求的数据、loading、error 信息
- [x] 自动化测试异步请求/hook/组件

### 项目地址

[点击浏览](https://citcen.github.io)

### 项目目录说明

```
使用create-react-app脚手架搭建
.
├─.husky                             // githook，检验commit是否规范与commit前格式化代码
├─public                             // 公共的静态资源
├─src
|  ├─__tests__                       // 自动化测试
|  |     ├─http.ts                   // 测试http请求
|  |     ├─mark.tsx                  // 测试mrak组件的高亮
|  |     ├─project-list.tsx          // 测试任务列表页面
|  |     └use-async.ts               // 测试异步请求useAsync的hook
|  ├─assets                          // 静态svg图片
|  |   ├─bug.svg
|  |   ├─header-logo.svg
|  |   ├─left.svg
|  |   ├─logo.svg
|  |   ├─right.svg
|  |   └task.svg
|  ├─components                      // 组件
|  |     ├─drag-and-drop.tsx         // 基于react-beautiful-dnd库的拖放功能组件
|  |     ├─error-boundary.tsx        // 设置错误边界捕获渲染或异步中产生的错误组件
|  |     ├─id-select.tsx             // select框组件（解决选择框string、number、空值的渲染问题）
|  |     ├─lib.tsx                   // 通用样式的组件
|  |     ├─mark.tsx                  // 模糊查询的文字高亮组件
|  |     ├─pin.tsx                   // 收藏功能的组件
|  |     ├─project-popover.tsx       // 收藏功能的组件
|  |     ├─task-type-select.tsx      // 任务type的选择框组件
|  |     ├─user-popover.tsx          // 组员列表弹出窗组件
|  |     └user-select.tsx            // 组员列表select框组件
|  ├─context                         // useContext
|  |    ├─auth-context.tsx           // useContext储存全局用户信息
|  |    └index.tsx                   // 全局状态入口
|  ├─mocks                           // mock service worker配置
|  |   ├─browser.ts                  // 配置和启动 service worker
|  |   ├─datas.ts                    // 默认mock数据
|  |   └handlers.ts                  // mock请求处理
|  ├─screens                         // 页面组件
|  |    ├─kanban                     // 看板
|  |    |   ├─create-kanban.tsx      // 创建看板
|  |    |   ├─create-task.tsx        // 创建任务
|  |    |   ├─index.tsx              // 看板入口
|  |    |   ├─kanban-column.tsx      // 看板列表
|  |    |   ├─kanban-util.ts         // 看板url和react-query配置
|  |    |   ├─search-panel.tsx       // 看板任务搜索模块
|  |    |   └task-modal.tsx          // 任务模态框
|  |    ├─project
|  |    |    └index.tsx              // 看板与任务组的左菜单和router
|  |    ├─project-list               // 项目列表
|  |    |      ├─index.tsx           // 项目列表入口
|  |    |      ├─list.tsx            // 项目列表table
|  |    |      ├─project-modal.tsx   // 项目增删改模态框
|  |    |      ├─project-util.ts     // 项目列表url和react-query配置
|  |    |      └search-panel.tsx     // 项目列表搜索模块
|  |    ├─task-group                 // 任务组
|  |          ├─create-taskgroup.tsx // 创建任务组
|  |          ├─index.tsx            // 任务组入口
|  |          └taskgroup-util.ts     // 任务组url和react-query配置
|  ├─types                           // TypeScript的类型声明
|  |   ├─kanban.ts                   // 看板的类型声明
|  |   ├─project.ts                  // 项目的类型声明
|  |   ├─sort.ts                     // 拖拽排序的类型声明
|  |   ├─task-group.ts               // 任务组的类型声明
|  |   ├─task.ts                     // 任务的类型声明
|  |   └user.ts                      // 用户的类型声明
|  ├─unauthenticated-app             // 用户登录前的页面
|  |          ├─index.tsx            // 入口文件
|  |          ├─login.tsx            // 登录页
|  |          └register.tsx          // 注册页
|  ├─utils                           // 公共函数封装
|  |   ├─http.ts                     // 封装异步请求
|  |   ├─index.ts                    // 常用的公共函数
|  |   ├─kanban-api.ts               // 看板页的异步请求
|  |   ├─reorder.ts                  // 重新排序的异步请求
|  |   ├─task-api.ts                 // 任务页的异步请求
|  |   ├─taskgroup-api.ts            // 任务组的异步请求
|  |   ├─url-get-set.ts              // url的拿取和改变
|  |   ├─use-api.ts                  // 项目的异步请求
|  |   ├─use-async.ts                // 管理异步请求的数据、loading、error信息
|  |   └use-optimistic-updates.ts   // 乐观更新
|  ├─App.css                         // 全局默认样式
|  ├─App.tsx                         // 页面入口，配置错误边界
|  ├─auth-provider.ts                // 用户身份认证配置
|  ├─authenticated-app.tsx           // 用户身份认证成功后的组件加载
|  ├─index.tsx                       // 渲染组件，引入msw
|  ├─react-app-env.d.ts              // ts类型声明文件
|  ├─wdyr.ts                         // 跟踪组件重复渲染的时间和原因
├─.env                               // 全局默认配置
├─.env.development                   // 开发环境下的配置.prettierignore
├─.gitignore                         // git管理，过滤文件的规则
├─.prettierignore                    // 忽略不希望格式化的文件
├─commitlint.config.js               // commit规范配置
├─craco.config.js                    // 可自定义webpack等配置，这里修改antd默认文字大小和背景色
├─package-lock.json                  // 锁定安装时的包的版本号及包的依赖的版本号
├─package.json                       // 配置项目相关信息
├─README.md                          // 项目说明
├─tsconfig.json                      // 指定待编译文件和定义编译选项
.
```
