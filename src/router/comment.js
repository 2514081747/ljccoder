const KoaRouter = require("koa-router");

const commentRouter = new KoaRouter({ prefix: "/comment" });

const { create,list,detail,update,deleteComment } = require("../controller/comment.controller");
const { verfyLogin, commentPermission } = require("../middleware/moment.middleware");

// 1、创建评论接口
commentRouter.post("/", verfyLogin, create);
// 2、获取评论列表
commentRouter.get('/',list)
// 3、根据commentId获取评论详情
commentRouter.get('/:commentId',detail)
// 4、修改评论
commentRouter.patch('/:commentId',verfyLogin,commentPermission,update)
// 5、删除评论
commentRouter.delete('/:commentId',verfyLogin,commentPermission,deleteComment)

module.exports = commentRouter;
