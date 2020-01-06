const pool = require('../module/db/pool');

module.exports = {
    create : async (json) => {
        let fields = 'boardIdx, userIdx, content';
        let questions = `"${json.boardIdx}", "${json.userIdx}", "${json.content}"`;
        if(json.ref_comment){
            fields = fields + ', ref_comment';
            questions = questions + `, "${json.ref_comment}"`;
        }
        const result = await pool.queryParam_None(`INSERT INTO Comment(${fields}) VALUES(${questions})`);
        return result;
    },

    read : async (boardIdx) => {
        const result = await pool.queryParam_None(`SELECT * FROM Comment WHERE boardIdx = ${boardIdx}`);
        return result;
    },

    update : async (json) => {
        const result = await pool.queryParam_None(`UPDATE Comment SET content = '${json.content}' WHERE userIdx = ${json.userIdx} AND commentIdx = ${json.commentIdx}`);
        return result;
    },

    remove : async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM Comment WHERE userIdx = '${json.userIdx}' and commentIdx = '${json.commentIdx}'`)
        return result;
    }
}
