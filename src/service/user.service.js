const connection = require('../app/database')

class UserService {
    async create(name,password){
        // 1.注入sql语句
        const statement = `INSERT INTO user (name,password) VALUES (?,?);`
        // 2.执行sql语句
        const result = await connection.execute(statement,[name,password])
        // ctx.body = result
        return result[0]
    }
    async getUserName(name){
        // 1.注入sql语句
        const statement = `SELECT * from user where name = ?;`
        // 2.执行sql语句
        const result = await connection.execute(statement,[name])
        return result[0]
    }
}

module.exports = new UserService()