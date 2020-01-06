const pool = require('../module/db/pool');

module.exports = {
    create : async (json) => {
        const fields = 'userIdx, boardIdx';
        const questions = `"${json.userIdx}", "${json.boardIdx}"`;
        const result = await pool.queryParam_None(`INSERT INTO Likes(${fields}) VALUES(${questions})`);
        return result;
    },

    check : async (json) => {
        const result = await pool.queryParam_None(`SELECT likeIdx FROM Likes WHERE userIdx = ${json.userIdx} AND boardIdx = ${json.boardIdx}`);
        return result;
    },

    read : async (boardIdx) => {
        const result = await pool.queryParam_None(`SELECT COUNT(likeIdx) FROM Likes WHERE boardIdx = ${boardIdx}`);
        return result;
    },

    remove : async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM Likes WHERE userIdx = '${json.userIdx}' and boardIdx = '${json.boardIdx}'`)
        return result;
    }
}
