const KoaRouter = require("koa-router");

const commentRouter = new KoaRouter({ prefix: "/comment" });

const { create } = require("../controller/comment.controller");
const {verfyLogin} = require('../middleware/moment.middleware')

// 1、创建评论接口
commentRouter.post("/",verfyLogin, create);

module.exports = commentRouter;
