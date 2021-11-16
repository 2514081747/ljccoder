const connection = require("../app/database");

class fileService {
  async createFile(filename, mimetype, size,id) {
    try {
      const statement = `INSERT INTO file (filename,mimetype,size,user_id) VALUES (?,?,?,?);`;
      const result = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        id
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new fileService();
