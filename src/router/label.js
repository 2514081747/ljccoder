const KoaRouter = require("koa-router");
const { create,list } = require("../controller/label.controller");
const { verfyLogin } = require("../middleware/moment.middleware");

const labelRouter = new KoaRouter({ prefix: "/label" });

labelRouter.post("/", verfyLogin, create);
labelRouter.get('/',list)

module.exports = labelRouter;
