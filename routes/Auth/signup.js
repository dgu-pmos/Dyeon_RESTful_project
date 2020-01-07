var express = require('express');
var router =  express.Router({mergeParams: true});

const crypto = require('crypto-promise');

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')
const db = require('../../module/db/pool');
const User = require('../../model/User');

// 회원가입
// userIdx id pwd name
router.post('/', async (req, res) => {
    const {email, password, name} = req.body;
    const json = {email, password, name};
    if(!email || !password || !name){
        const missParameters = Object.entries({email, password, name})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST).send(defaultRes.successFalse(resMessage.X_NULL_VALUE(missParameters)));
        return;
    }

    CheckUser = await User.checkUser(email);

    if(!CheckUser){
        res.status(200).send(defaultRes.successFalse(resMessage.DB_ERROR));    // DB ERROR
        return ;
    }

    if(CheckUser.length != 0){   // 유저가 있는 경우
        res.status(400).send(defaultRes.successFalse(resMessage.ALREADY_ID));    // 필요한 값이 없습니다.
        return ;
    }
    signupResult = await User.signup(json);
    // const random = await crypto.randomBytes(64);
    // const salt = random.toString('base64');
    // const hashedPwd = await crypto.pbkdf2(pwd.toString(), salt, 1000, 32, 'SHA512');

    // const signupResult = await db.queryParam_Arr(signupQuery, [email, hashedPwd.toString('base64'), name, salt]);
    
    if(!signupResult){  // insert 실패
        res.status(statusCode.BAD_REQUEST).send(defaultRes.successFalse(resMessage.SIGN_UP_FAIL));  // 유저 회원가입 실패
        return ;
    }else{
        res.status(statusCode.OK).send(defaultRes.successTrue(resMessage.SIGN_UP_SUCCESS, "성공"));    // 유저 회원가입 성공
    } 
});

module.exports = router;