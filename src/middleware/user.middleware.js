const md5password = require("../utils/handle-password");
const { getUserName } = require("../service/user.service");
const { USER_ALREADY_EXISTS } = require("../app/error-types");
// const errorHandle = require("../app/error-handle");
const verfyUser = async (ctx, next) => {
  console.log("数据库是否存在此用户进行验证");
  // 1.获取注册时用户传过来的name
  const { name } = ctx.request.body;
  // 2.拿着name向数据库查询是否存在此用户,存在返回用户名存在的错误
  const result = await getUserName(name);
  if (result.length) {
    const error = new Error(USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  } else {
    await next();
  }
};
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};


module.exports = {
  handlePassword,
  verfyUser,
};
