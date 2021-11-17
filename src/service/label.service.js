const connection = require("../app/database");
class labelService {
  async createLabel(name) {
    console.log(name)
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const result = connection.execute(statement, [name]);
    return result;
  }

  async serachLabel(limit,offset){
      console.log(limit,offset)
      const statement = `SELECT * FROM label LIMIT ?,?;`
      const result = connection.execute(statement,[offset,limit])
      return result
  }
  async serachLablesExist(name){
      const statement = `SELECT * FROM label WHERE name = ?`
      const result = connection.execute(statement,[name])
      return result
  }
}

module.exports = new labelService();
