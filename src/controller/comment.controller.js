const { createComment,getCommentList,getCommentDetail, updateComment,delComentById } = require("../service/comment.service");
class commentController {
  async create(ctx, next) {
    // 1、获取用户上传的评论数据
    const { id } = ctx.user;
    const { momentId, content } = ctx.request.body;
    console.log(id, momentId, content);
    // // 2、将用户上传的评论数据存到数据库
    const result = await createComment(momentId, content, id);
    ctx.body = result;
  }

  async list(ctx,next){
    // 1、获取用户传递的参数
    const {limit,offset} = ctx.query
    console.log(limit,offset)
    // 2、查询数据库列表
    const result = await getCommentList(limit,offset)
    ctx.body = result
  }
  async detail(ctx,next){
    const {commentId} = ctx.params
    console.log(commentId)
    const result = await getCommentDetail(commentId)
    ctx.body = result[0]
  }
  async update(ctx,next){
    const {commentId} = ctx.params
    const {content} = ctx.request.body
    console.log(commentId,content)
    const result = await updateComment(commentId,content)
    ctx.body = result
  }

  async deleteComment(ctx,next){
    const {commentId} = ctx.params
    const {id} = ctx.user
    // console.log(commentId)
    const result = await delComentById(commentId,id)
    ctx.body = result
  }
}

module.exports = new commentController();
