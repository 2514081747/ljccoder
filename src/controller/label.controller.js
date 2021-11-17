const { createLabel,serachLabel } = require("../service/label.service");
class labelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await createLabel(name);
    ctx.body = result[0];
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    //   console.log(limit,offset)
    const result = await serachLabel(limit, offset);
    ctx.body = result[0]
  }
}

module.exports = new labelController();
