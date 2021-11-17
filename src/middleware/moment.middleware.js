// 验证用户是否登录
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../app/keys/public.key")
);
const {
  TOKEN_IS_NOT_EXISTS,
  NOT_HAS_PERMISSION,
} = require("../app/error-types");

const { checkMomentPermission } = require("../service/moment.service");
const { checkComment } = require("../service/comment.service");
const { serachLablesExist } = require("../service/label.service");
const { createMomentLabel } = require("../service/label.moment");
const { createLabel } = require("../service/label.service");
const verfyLogin = async (ctx, next) => {
  // 1.拿到token 判断用户是否登录
  const { authorization } = ctx.request.headers;
  let token = authorization ? authorization.replace("Bearer ", "") : null;
  if (!token) {
    const error = new Error(TOKEN_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 验证token是否正确
  token = token.slice(1, token.length - 1);
  //需要将token字符首尾双引号去掉
  const result = jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
  });
  //此处应该是id和name  而不是name password参与token颁发
  ctx.user = result;
  await next();
};

// 判断用户是否具备更新的权限
const permission = async (ctx, next) => {
  // 思路：只有更新自己发表的动态的权限
  // 1、拿到当前的user_id
  const { id } = ctx.user;
  // 2、拿到当前需要更新的moment_id
  const { momentId } = ctx.params;
  // 3、去数据库查询相关数据
  const result = await checkMomentPermission(momentId, id);
  // console.log(result)
  console.log(result);
  if (result) {
    await next();
  } else {
    const error = new Error(NOT_HAS_PERMISSION);
    ctx.app.emit("error", error, ctx);
  }
};

// 判断用户是否是更新评论的权限
const commentPermission = async (ctx, next) => {
  // console.log('aaaa')
  // 1、拿到commentId 和 userId
  const { commentId } = ctx.params;
  const { id } = ctx.user;
  console.log(commentId, id);
  // 2、查询数据库判断是否具有权限
  const result = await checkComment(commentId, id);
  console.log(result);
  if (result) {
    await next();
  } else {
    const error = new Error(NOT_HAS_PERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};

const isLabelExistAndCreate = async (ctx, next) => {
  const { labels } = ctx.request.body;
  // console.log(labels);
  const { momentId } = ctx.params;
  // 1、判断label在标签表中是否存在 若存在则加入数据库 不存在则先创建此标签
  let newLabel = [];
  for (let name of labels) {
    // 查询数据库
    const result = await serachLablesExist(name);
    // console.log(result[0])
    if (result[0].length) {
      // 直接将数据存入关系表
      const res = await createMomentLabel(momentId, result[0][0].id);
      ctx.body = res;
    } else {
      // 创建新标签,并写入关系表
      const resy = await createLabel(name);
      const resn = await createMomentLabel(momentId, resy[0].insertId);
      ctx.body = resn;
    }
  }
};

module.exports = {
  verfyLogin,
  permission,
  commentPermission,
  isLabelExistAndCreate,
};
