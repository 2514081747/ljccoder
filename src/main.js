const app = require('./app/index')
const config = require('./app/config')
const errorHander = require('./app/error-handle')
app.on('error',errorHander)
require('./app/database')

app.listen(config.APP_PORT,() => {
    console.log(`服务器启动成功！！！${config.APP_PORT}`)
})

