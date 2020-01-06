const pool = require('../module/db/pool');
const table = 'User';

const user = {
    signup : async (json) => {
        const fields = 'userId, password, salt, name, birth, gender, userImg';
        const questions = `"${json.userId}","${json.finalPw}","${json.salt}","${json.name}","${json.birth}","${json.gender}","${json.userImg}"`;        
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`)
        return result;
    },
    checkUser : async (userId) => {   
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE userId = "${userId}"`)
        return result;     
    }   
}

module.exports = user;