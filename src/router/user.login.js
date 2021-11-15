const koaRuter = require("koa-router");

const {login} = require('../controller/login.controll')
const {handlePassword} = require('../middleware/user.middleware')


const userLogin = new koaRuter({prefix:'/login'})

// 1.登录之前先把密码进行加密

userLogin.post('/',handlePassword,login)

module.exports = userLogin