const Multer = require('koa-multer')
const avater = Multer({
    dest:'./upload/img'
})
const avaterHandle = avater.single('avater')

module.exports = {
    avaterHandle
}