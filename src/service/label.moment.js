const connection = require('../app/database')

class momentLabelService{
    async createMomentLabel(moment_id,label_id){
        console.log(moment_id,label_id)
        const statement = `INSERT INTO laber_moment (moment_id,label_id) VALUES (?,?);`
        const result = connection.execute(statement,[moment_id,label_id])
        return result
    }
}

module.exports = new momentLabelService()