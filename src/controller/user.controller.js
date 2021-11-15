const { USER_OR_PASSWORD_IS_NOT_EXISTS } = require("../app/error-types");
const { create } = require("../service/user.service");
class userController {
  async create(ctx, next) {
    // ctx.body = '用户注册接口'
    // 1.获取用户上传的username和password
    const { name, password } = ctx.request.body;
    console.log(name, password);
    // 2.判断username和password不为空
    if (!name || !password) {
      // const error = new Error(USER_OR_PASSWORD_IS_NOT_EXISTS)
      const error = new Error(USER_OR_PASSWORD_IS_NOT_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }
    // 3.将用户注册的数据写入数据库
    const result = await create(name, password);
    ctx.body = result;
  }
}

module.exports = new userController();
