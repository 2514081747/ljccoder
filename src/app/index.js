const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const userLogin = require('../router/user.login')
const app = new koa()


app.use(bodyparser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.use(userLogin.routes())
app.use(userLogin.allowedMethods())

module.exports = app