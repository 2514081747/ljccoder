const KoaRouter = require("koa-router");
const { create } = require("../controller/file.controller");
// const { avaterHandle } = require("../middleware/file.middleware");
const {verfyLogin} = require('../middleware/moment.middleware')
const multer = require('koa-multer');
const upload = multer({
    dest:'../app/upload'
})

const fileRouter = new KoaRouter({ prefix: "/file" });

fileRouter.post("/",upload.single('avater'),verfyLogin, create);

module.exports = fileRouter;
