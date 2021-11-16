// const {createComment} = require('../service/comment.service');
class commentController {
  async create(ctx, next) {
    // 1、获取用户上传的评论数据
    const { id } = ctx.user;
    const {momentId,content} = ctx.request.body
    console.log()
    // 2、将用户上传的评论数据存到数据库
    // const result = await createComment(momentId,content,id)
    // ctx.body = result;
    ctx.body = 'hao'
  }
}

module.exports = new commentController();
