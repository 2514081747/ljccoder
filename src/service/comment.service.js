const connection = require("../app/database");

class commentService {
  async createComment(momentId, content, user_id) {
    // 1、注入sql语句
    const statement = `INSERT INTO commenty (moment_id,content,user_id) VALUES (?,?,?);`;
    try {
      const result = await connection.execute(statement, [
        momentId,
        content,
        user_id,
      ]);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
  async getCommentList(limit, offset) {
    const statement = `SELECT * FROM commenty LIMIT ?,?`;
    const result = await connection.execute(statement, [offset, limit]);
    return result[0];
  }
  async getCommentDetail(commentId){
    const statement = `SELECT * FROM commenty WHERE id = ?`
    const result = await connection.execute(statement,[commentId])
    return result[0]
  }
  async checkComment(commentId,id){
    const statement = `SELECT * FROM commenty WHERE id = ? AND user_id = ?`
    const result = await connection.execute(statement,[commentId,id])
    return result[0].length ? true : false
  }
  async updateComment(commentId,content){
    const statement = `UPDATE commenty SET content = ?  WHERE id = ?`
    const result = connection.execute(statement,[content,commentId])
    return result
  }

  async delComentById(commentId,id){
    console.log(commentId,id)
    const statement = `DELETE FROM commenty WHERE id = ?  AND user_id = ?`
    const result = connection.execute(statement,[commentId,id])
    return result
  }
}

module.exports = new commentService();
