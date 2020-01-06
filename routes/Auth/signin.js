var express = require('express');
var router =  express.Router({mergeParams: true});

//hash를 위한 라이브러리함수이다.
const crypto = require('crypto-promise');


const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage');

const db = require('../../module/db/pool');
const jwt = require('../../module/utils/jwt');

router.post('/', async(req, res) => {
    //이메일과 패스워드로 로그인을 한다.
    let email = req.body.email;
    let pwd = req.body.pwd;

    //둘중 하나라도 값이 없으면...(수정할 것)
    if(!email || !pwd){
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, "정보가 부족합니다."));
    }
    const selectQuery = 'SELECT * FROM User Where email = ?'
    const selectResult = await db.queryParam_Arr(selectQuery, [email]);

    if(!selectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    if(selectResult.lenghth == 0){
        res.status(400).send(defaultRes.successFalse(statusCode.NO_CONTENT, resMessage.NULL_VALUE));
    }

    // const salt = selectResult[0].salt;  // 유저의 솔트값
    // const hashedInputPwd = await crypto.pbkdf2(pwd.toString(), salt, 1000, 32, 'SHA512');   // 입력한 패스워드의 해쉬된 패스워드
    // if(selectResult[0].pwd != hashedInputPwd.toString('base64')){   // 패스워드가 일치하지 않을 경우
    //     res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.NOT_CORRECT_PASSWORD));
    //     return ;
    // }
    const token = jwt.sign(selectResult[0]);
    await res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_SIGNIN, token));
});

module.exports = router;