const {createFile} = require('../service/file.service')
class fileController {
  async create(ctx, next) {
    // ctx.body = '上传文件成功~'
    console.log(ctx.req.file);
    const {id} = ctx.user
    const { filename, mimetype, size } = ctx.req.file;
    console.log(filename,mimetype,size)
    // 将数据存入数据库
    const result = await createFile(filename,mimetype,size,id)
    ctx.body = result

  }
}

module.exports = new fileController();
