const koaRuter = require("koa-router");

const userRouter = new koaRuter({ prefix: "/user" });

const { create } = require("../controller/user.controller");

const { handlePassword ,verfyUser} = require("../middleware/user.middleware");

// 1.用户注册时对密码进行加密处理 handlePassword
// 2.注册时 验证数据库是否存在此用户 若存在 则返回用户名已存在的错误

userRouter.post("/",verfyUser, handlePassword, create);

module.exports = userRouter;
