const {
  createMoment,
  serachMoment,
  momentDetail,
  updateMoment,
  deleteMomentservice
} = require("../service/moment.service");
class momentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    const result = await createMoment(content, id);

    ctx.body = result[0];
  }

  async list(ctx, next) {
    // 1、获取动态分页参数
    const { limit, offset } = ctx.query;
    // 2、查询数据库
    const result = await serachMoment(offset, limit);
    ctx.body = result[0];
  }

  async detail(ctx, next) {
    //1、获取参数momentId
    const { momentId } = ctx.params;
    // 2、根据momentId获取动态详情
    const result = await momentDetail(momentId);
    ctx.body = result[0];
  }

  async update(ctx, next) {
    // 1、获取动态id
    const { momentId } = ctx.params;
    // 2、根据momentId修改moment内容
    const {content} = ctx.request.body
    // console.log(content)
    // 3.修改数据库内容
    const result = await updateMoment(content,momentId)
    console.log(result)
    ctx.body = result
  }

  async deleteMoment(ctx,next){
    // 1.获取动态id
    const {momentId} = ctx.params
    // 2.根据momentId删除该条数据
    const result = await deleteMomentservice(momentId)
    ctx.body = result


  }
}

module.exports = new momentController();
