const pool = require('../module/db/pool');

module.exports = {
    create : async (json) => {
        /*
        // 나라, 대륙, 제목, 내용, 작성시간, 동행시작시간, 동행종료시간, 작성자인덱스, 활성화유무, 동행자 수, 동성필터여부
        const fields = 'regionCode, regionName, title, content, uploadTime, startDate, endDate, userIdx, filter';   
        const questions = `"${json.regionCode}", "${regionName[0].regionName}", "${json.title}", "${json.content}", "${json.uploadTime}", "${json.startDate}", "${json.endDate}", "${json.userIdx}", "${json.filter}"`;
        let result = await pool.queryParam_None(`INSERT INTO ${table1}(${fields}) VALUES(${questions})`);
        return result;
        */
    },

    readAll : async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM Board`);
        return result;
    },

    read : async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM Board`);
        return result;
    },

    update : async (json) => {
        /*
        const conditions = [];

        // regionCode에 맞는 regionName을 query에 추가한다.
        if (json.regionCode){
            conditions.push(`regionCode = '${json.regionCode}'`);
            const result = await pool.queryParam_None(`SELECT regionName FROM Region WHERE regionCode = ${json.regionCode}`);
            conditions.push(`regionName = '${result[0].regionName}'`);
        }
        // 변경 파라미터가 존재하면 push 한다.
        if (json.title) conditions.push(`title = '${json.title}'`);
        if (json.content) conditions.push(`content = '${json.content}'`);
        if (json.startDate) conditions.push(`startDate = '${json.startDate}'`);
        if (json.endDate) conditions.push(`endDate = '${json.endDate}'`);
        if (json.filter) conditions.push(`filter = '${json.filter}'`);

        const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
        const result = await pool.queryParam_None(`UPDATE ${table1} ${setStr} WHERE boardIdx = ${boardIdx}`);
        return result;
        */
    },

    delete : async (json) => {

    }
}
