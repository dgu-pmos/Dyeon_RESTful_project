var express = require('express');
var router =  express.Router({mergeParams: true});

//hash를 위한 라이브러리함수이다.
const crypto = require('crypto-promise');


const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage');

const db = require('../../module/db/pool');
const User = require('../../model/User');
const jwt = require('../../module/utils/jwt');

router.post('/', async(req, res) => {
    //이메일과 패스워드로 로그인을 한다.
    const { email, pwd }  = req.body; 
    //둘중 하나라도 값이 없으면...
    if(!email || !pwd){
        const missParameters = Object.entries({email, pwd})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST).send(defaultRes.successFalse(resMessage.X_NULL_VALUE(missParameters)));
    }
    const selectResult = await User.checkUser(email);
    console.log(selectResult);
    //DB 에러
    if(!selectResult){
        res.status(statusCode.DB_ERROR).send(defaultRes.successFalse(resMessage.DB_ERROR));
    }

    //유저가 없을 때
    if(selectResult.length == 0){
        res.status(statusCode.BAD_REQUEST).send(defaultRes.successFalse(resMessage.X_NULL_VALUE("해당("+email+")")));
    }
    
    //유저가 있을 때
    else{
        const passwordChecking = await User.checkPassword(email, pwd);
        console.log(passwordChecking);
        if(passwordChecking.length == 0){
            res.status(statusCode.BAD_REQUEST).send(defaultRes.successFalse(resMessage.MISS_MATCH_PW)); 
        } else{
            const token = await jwt.sign(selectResult[0]);
            res.status(200).send(defaultRes.successTrue(resMessage.SUCCESS_USER_SIGNIN, token));    
        }
    }    
    // 
    // const salt = selectResult[0].salt;  // 유저의 솔트값
    // const hashedInputPwd = await crypto.pbkdf2(pwd.toString(), salt, 1000, 32, 'SHA512');   // 입력한 패스워드의 해쉬된 패스워드
    // if(selectResult[0].pwd != hashedInputPwd.toString('base64')){   // 패스워드가 일치하지 않을 경우
    //     
    //     return ;
    // }
    
});

module.exports = router;