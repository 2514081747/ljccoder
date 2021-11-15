// 验证用户是否登录
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../app/keys/public.key")
);
const { TOKEN_IS_NOT_EXISTS,NOT_HAS_PERMISSION } = require("../app/error-types");

const {checkMomentPermission} = require('../service/moment.service')
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
    const {id} = ctx.user
    // 2、拿到当前需要更新的moment_id
    const {momentId} = ctx.params
    // 3、去数据库查询相关数据
    const result = await checkMomentPermission(momentId,id)
    // console.log(result)
    console.log(result)
    if(result){
        await next()
    }else{
        const error = new Error(NOT_HAS_PERMISSION)
        ctx.app.emit('error',error,ctx)
    }
    
};

module.exports = {
  verfyLogin,
  permission
};
