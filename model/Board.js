const pool = require('../module/db/pool');

module.exports = {
    create : async (json) => {
        const fields = 'userIdx, title, content, active';
        const questions = `"${json.userIdx}", "${json.title}", "${json.content}", "${json.active}"`;
        const result = await pool.queryParam_None(`INSERT INTO Board(${fields}) VALUES(${questions})`);
        return result;
    },

    readAll : async () => {
        const result = await pool.queryParam_None(`SELECT * FROM Board WHERE active = 1`);
        return result;
    },

    read : async (boardIdx) => {
        const result = await pool.queryParam_None(`SELECT * FROM Board WHERE boardIdx = ${boardIdx}`);
        return result;
    },

    update : async (json) => {
        const conditions = [];

        // regionCode에 맞는 regionName을 query에 추가한다.
        if (json.title) conditions.push(`title = '${json.title}'`);
        if (json.content) conditions.push(`content = '${json.content}'`);
        if (json.active) conditions.push(`active = '${json.active}'`);

        const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
        const result = await pool.queryParam_None(`UPDATE Board ${setStr} WHERE userIdx = ${json.userIdx} AND boardIdx = ${json.boardIdx}`);
        return result;
    },

    remove : async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM Board WHERE userIdx = '${json.userIdx}' and boardIdx = '${json.boardIdx}'`)
        return result;
    }
}
