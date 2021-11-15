const connection = require('../app/database')

class LoginService {
    async getUser(name,password){
        const statement = `SELECT id,name FROM user WHERE name = ? AND password = ?`
        const result = await connection.execute(statement,[name,password])
        return result[0]
    }
}


module.exports = new LoginService()