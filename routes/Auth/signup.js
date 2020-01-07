var express = require('express');
var router =  express.Router({mergeParams: true});

const crypto = require('crypto-promise');

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')
const db = require('../../module/db/pool');

// 회원가입
// userIdx id pwd name
router.post('/', async (req, res) => {
    let email = req.body.email;
    let pwd = req.body.pwd;
    let name = req.body.name;

    if(!email || !pwd || !name){   // null input 
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));    // 필요한 값이 없습니다.
        return ;
    }
    const selectQuery = 'SELECT * FROM User WHERE email = ?'
    const selectResult = await db.queryParam_Arr(selectQuery, [email]);
    console.log(selectResult);
    if(!selectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    // DB ERROR
        return ;
    }

    if(selectResult.length != 0){   // 유저가 있는 경우
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.ALREADY_USER_SIGNUP));    // 필요한 값이 없습니다.
        return ;
    }

    const signupQuery = 'INSERT INTO User (email, password, name) VALUES (?, ?, ?)';

    // const random = await crypto.randomBytes(64);
    // const salt = random.toString('base64');
    // const hashedPwd = await crypto.pbkdf2(pwd.toString(), salt, 1000, 32, 'SHA512');

    // const signupResult = await db.queryParam_Arr(signupQuery, [email, hashedPwd.toString('base64'), name, salt]);
    const signupResult = await db.queryParam_Arr(signupQuery, [email, pwd, name]);
    console.log(signupResult);
    if(!signupResult){  // insert 실패
        res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.FAIL_USER_SIGNUP));  // 유저 회원가입 실패
        return ;
    }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_SIGNUP, "성공"));    // 유저 회원가입 성공
});

module.exports = router;