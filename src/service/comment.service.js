// const connection = require("../app/database");

class commentService {
  async createComment(momentId, content, user_id) {
    // 1、注入sql语句
    // const statement = `INSERT INTO comment (moment_id,content,user_id) VALUES (?,?,?);`;
    // try {
    //     await connection.execute(statement, [
    //     momentId,
    //     content,
    //     user_id,
    //   ]);
    // } catch (error) {
    //   console.log(error.message);
    // }
    // return result;
  }
}

module.exports = new commentService();
