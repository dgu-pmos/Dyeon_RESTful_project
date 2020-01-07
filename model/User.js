const pool = require('../module/db/pool');
const table = 'User';

const user = {
    signup : async (json) => {
        const fields = 'email, name, password';
        const questions = `"${json.email}","${json.name}","${json.pwd}"`;        
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`)
        return result;
    },
    checkUser : async (email) => {   
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE email = "${email}"`)
        return result;     
    }, 
    checkPassword : async (email, password) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE email = "${email}" AND password = "${password}"`)
        return result;
    }  
}

module.exports = user;