# 一、项目简述

- 🎉🎉🎉 这是一个基于 Vue3 和 EggJs 的后台管理系统，主要业务功能有：
  - 用户管理 ✅
  - 角色管理 ✅
  - 菜单管理 ✅
  - 权限管理 ✅
  - 商品分类管理 ✅
  - 商品管理 ✅
  - 订单管理等 ✅
- 该项目算是一个相对完整的项目 🪧🪧🪧，包含了需求文档、技术文档等，可以帮助你快速进入一场符合实际业务场景的开发（当然，需求文档的业务相对来说，不是特别特别的完整，同时也有一些小瑕疵 😅，但是！but！不影响我们的实际使用和开发 📣📣📣 重要的事儿喇叭喊出来）
- 从需求层面上讲，包含了如下几个在后台管理系统中常见的需求
  - RBAC 的权限管理 ✅
  - 数据层面的角色区分 ✅
  - 操作按钮的权限区分 ✅
  - 菜单的动态管理 ✅
  - ...
- 麻雀虽小，但是，相对来说也算拥有了五脏 😅

---

最后，谈论下大家所关心的技术栈问题。技术栈总的来说不管前端和后端，都算是比较新的

> **前端**
>
> - `VueJs3`
> - `ElementPlus`
> - `Typescript`
> - `Pinia`
> - `vite`

> **后端**
>
> - `EggJs 3+`
> - `sequelizeJs`
> - `egg-jwt`
> - `egg-sequelize`
> - `egg-validate`

# 二、你能得到什么

相信经常逛 Github 或者掘金社区的朋友们，都是热衷于成长进步的人 👍；在此项目中，包含了需求文档、技术文档等 📣。相信这些文档，可以帮助你快速进入一场符合实际业务场景的开发，当大家熟悉了`CRUD`的开发模式后，完全可以脱离咱们项目的约束，参照需求文档和设计文档，自己完成所对应的开发 🎉 当然，大家也可以基于这套 RBAC 权限管理框架，自己完成一个后台管理系统，或者基于此框架，完成一个自己的项目。

# 三、需求文档

因为文档比较长，所以，我直接放到了语雀知识库中，感兴趣的朋友，可以点击下面的链接，查看文档 📚

[语雀知识库](https://markdown.com.cn "https://www.yuque.com/huaibeicaizi/hax7y6?# 《码农商城》")。

需求文档部分截图

![需求文档](/Markdown/images/document3.png "需求文档")

<center><font face="黑体" size=3>【图一】需求文档</font></center>

![需求文档](/Markdown/images/document4.png "需求文档")

<center><font face="黑体" size=3>【图二】需求文档</font></center>

**<font color=red>在此声明，未经允许，禁止转载！版权归本项目作者所有</font>**

# 四、技术文档

因为文档比较长，所以，我直接放到了语雀知识库中，感兴趣的朋友，可以点击下面的链接，查看文档 📚

[语雀知识库](https://markdown.com.cn "https://www.yuque.com/huaibeicaizi/hax7y6?# 《码农商城》")。

技术文档部分截图

![技术文档1](/Markdown/images/document1.png "技术文档1")

<center><font face="黑体" size=3>【图一】技术文档</font></center>

![技术文档2](/Markdown/images/document2.png "技术文档2")

<center><font face="黑体" size=3>【图二】技术文档</font></center>

**<font color=red>在此声明，未经允许，禁止转载！版权归本项目作者所有</font>**

# 五、部分页面截图

![订单列表](/Markdown/images/orderList.png "订单列表")

<center><font face="黑体" size=3>【图一】订单列表</font></center>

![商品列表](/Markdown/images/goodsList.png "商品列表")

<center><font face="黑体" size=3>【图二】商品列表</font></center>

![商品分类](/Markdown/images/classification.png "商品分类")

<center><font face="黑体" size=3>【图三】商品分类</font></center>

![用户管理](/Markdown/images/user.png "用户管理")

<center><font face="黑体" size=3>【图四】用户管理</font></center>

![权限管理](/Markdown/images/permission.png "权限管理")

<center><font face="黑体" size=3>【图五】权限管理</font></center>

![角色管理](/Markdown/images/role.png "角色管理")

<center><font face="黑体" size=3>【图六】角色管理</font></center>

![角色详情](/Markdown/images/roleDetail.png "角色详情")

<center><font face="黑体" size=3>【图七】角色详情</font></center>

![菜单管理](/Markdown/images/menu.png "菜单管理")

<center><font face="黑体" size=3>【图八】菜单管理</font></center>

# 功能开发进度

- [x] 用户登录

---

- [x] 权限管理相关
- [x] 新增、编辑权限
- [x] 获取权限列表（所有）
- [x] 获取当前人员所拥有的权限
- [x] 删除权限

---

- [x] 菜单管理相关
- [x] 编辑、创建菜单
- [x] 删除菜单
- [x] 获取菜单列表
- [x] 获取菜单详情
- [x] 获取菜单树形结构（根据角色区分）

---

- [x] 编辑、创建角色
- [x] 获取角色详情
- [x] 删除角色
- [x] 获取角色列表

---

- [x] 人员操作相关
- [x] 创建、编辑员工
- [x] 操作员工离职
- [x] 更改员工密码
- [x] 获取用户信息
- [x] 更新用户角色
- [x] 获取人员角色
- [x] 获取人员列表
- [x] 获取人员权限
- [x] 获取人员菜单

---

- [x] 商品分类相关
- [x] 编辑、创建商品分类
- [x] 获取商品分类列表
- [x] 获取当前角色所具有的分类
- [x] 获取当前分类详情

---

- [x] 商品管理相关
- [x] 编辑、创建商品
- [x] 更新库存
- [x] 更新上架状态
- [x] 获取商品详情

---

- [x] 订单管理相关
- [x] 创建订单
- [x] 获取订单列表
- [ ] 查询当前商品的售卖数据统计

# 六、关于未来 🧑‍🚀

- 未来此项目会持续进行迭代，预计迭代一年后停止维护
- 未来会增加的功能或技术
  - 增加 Redis 的使用场景
  - 增加定时任务的使用场景
  - 增加 WebSocket 使用场景
  - 优化订单系统（说真的，现在的订单太 low）
  - 增加管理员工作台功能
  - 增加日志上报的功能
  - 很可能会集成**微前端**做架构升级（尽管他在这个项目中文真的没必要存在）
- 现在的项目作为乞丐版在运行，未来会慢慢丰富他的羽翼

# 七、项目运行

说了这么多，看了这么多，项目跑不起来都是白扯啊！此部分将描述怎么在本地运行起来

## 前端

- `Nodejs版本` >= 16.18
- 打开`/endMall/app/databases`, 运行下面的`ma_nong_mall.sql`
- 执行`npm install`命令安装依赖
- dev 运行`npm run dev`
- 打包`npm run build`

## 后端

- `Nodejs版本` >= 16.18
- `Mysql版本` 8.0.33
- 执行`npm install`命令安装依赖
- 执行 sql 脚本文件
- dev 运行`npm run dev`

## 登录

- 用户名：`admin`
- 密码：`123456`

# 致谢、结语
感谢您能看到这里，希望本项目能带给您一些收获。最后诚恳的请求大家，**给个 Star 吧**，这将是对我最大的鼓励！！！也是我持续维护此项目的动力！

<img src="/Markdown/images/good.png" width=200/>

最后呢～如果您觉得此项目对您的学习有一些帮助，可以请作者喝一杯奶茶么～感谢大家！
![求star](/Markdown/images/panda.png "求star")

<figure class="half">
  <img src="/Markdown/images/zhifubao.jpeg" width=200/>
  <img src="/Markdown/images/weixin.jpeg" width=200 style="margin-left: 20px" />
</figure>

📣📣📣最后还有一件事儿，我们也接外包、私活儿等，如果您有需求，可以联系我，**加我微信**，T_wit-winner