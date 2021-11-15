const koa = require('koa')
const bodyparser = require('koa-bodyparser')

const app = new koa()
const useRoutes = require('../router/index')

app.useRoutes = useRoutes;

app.use(bodyparser())
app.useRoutes()

module.exports = app