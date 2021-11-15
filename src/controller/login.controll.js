const {
  USER_OR_PASSWORD_IS_NOT_EXISTS,
  USERNAME_OR_PASSWORD_IS_MUST,
} = require("../app/error-types");
const { getUser } = require("../service/login.service");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../app/keys/private.key")
);
class LoginController {
  async login(ctx, next) {
    console.log("用户登录成功！！");
    // 1.判断用户输入的name和password
    const { name, password } = ctx.request.body;
    //用户名密码为必须
    if (!name || !password) {
      const error = new Error(USER_OR_PASSWORD_IS_NOT_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }
    // 2.判断name和password是否正确,其中，先加密密码,在进行查询
    const result = await getUser(name, password);
    // console.log(result)
    if (!result.length) {
      const error = new Error(USERNAME_OR_PASSWORD_IS_MUST);
      return ctx.app.emit("error", error, ctx);
    }
    // 3.验证账号密码通过,下发token
    const token = jwt.sign({ name, password }, privateKey, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = { ...result[0], token };
  }
}

module.exports = new LoginController();
