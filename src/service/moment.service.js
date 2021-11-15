const connection = require("../app/database");

class momentService {
  async createMoment(content, id) {
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?)`;
    const result = await connection.execute(statement, [content, id]);
    return result;
  }
  async serachMoment(offset, limit) {
    const statement = `SELECT * FROM moment LIMIT ?,?`;
    const result = await connection.execute(statement, [offset, limit]);
    return result;
  }

  async momentDetail(momentId) {
    const statement = `SELECT * FROM moment WHERE id = ?`;
    const result = await connection.execute(statement, [momentId]);
    return result;
  }

  async checkMomentPermission(moment_id, user_id) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?`;
    const result = await connection.execute(statement, [moment_id, user_id]);
    return result[0].length ? true : false;
  }
  async updateMoment(content, moment_id) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, moment_id]);
    return result[0];
  }

  async deleteMomentservice(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const result = await connection.execute(statement,[momentId])
    return result
  }
}

module.exports = new momentService();
