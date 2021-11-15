// const {USER_OR_PASSWORD_IS_NOT_EXISTS} = require('./error-types')
const {
  USER_OR_PASSWORD_IS_NOT_EXISTS,
  USER_ALREADY_EXISTS,
  USERNAME_OR_PASSWORD_IS_MUST,
} = require("./error-types");

const errorHander = (error, ctx) => {
  console.log(error.message);
  let status, message;
  switch (error.message) {
    case USER_OR_PASSWORD_IS_NOT_EXISTS:
      status = 400;
      message = "用户名或者密码为空";
      break;
    case USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已经存在~";
      break;
    case USERNAME_OR_PASSWORD_IS_MUST:
      status = 400;
      message = "用户名或者密码错误~";
      break;
    default:
      status = 404;
      message = "NOT FOUNT";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHander;
