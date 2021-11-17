const KoaRouter = require("koa-router");

const momentRouter = new KoaRouter({ prefix: "/moment" });

const { verfyLogin, permission,isLabelExistAndCreate } = require("../middleware/moment.middleware");
const {
  create,
  list,
  detail,
  update,
  deleteMoment,
} = require("../controller/moment.controller");

// 发表动态之前，验证用户是否登录
// 1.用户发表动态
momentRouter.post("/", verfyLogin, create);
// 2.获取动态列表
momentRouter.get("/", list);
// 3.根据momentid获取动态详情
momentRouter.get("/:momentId", detail);
// 4.修改某条动态的内容 修改某条动态的内容有两个条件 第一 用户登录 第二 修改本人的动态
momentRouter.patch("/:momentId", verfyLogin, permission, update);
// 5.删除某条动态的内容
momentRouter.delete('/:momentId',verfyLogin,permission,deleteMoment)
// 6、给动态添加标签
momentRouter.post('/:momentId/labels',verfyLogin,permission,isLabelExistAndCreate)

module.exports = momentRouter;
