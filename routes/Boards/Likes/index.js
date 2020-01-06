var express = require('express');
var router = express.Router({mergeParams: true});

const authUtil = require('../../../module/utils/authUtil');
const utils = require('../../../module/utils/utils');
const responseMessage = require('../../../module/utils/responseMessage');
const statusCode = require('../../../module/utils/statusCode');

const Likes = require('../../../model/Likes');

router.post('/', async (req, res) => {
    const userIdx = req.body.userIdx;
    const boardIdx = Number(req.params.boardIdx);
    // search miss parameters
    if(!boardIdx || !userIdx){
        const missParameters = Object.entries({boardIdx, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }

    const json = {userIdx, boardIdx};
    const checkIdx = await Likes.check(json);
    if(checkIdx.length != 0){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.LIKE_ALREADY));
        return;
    }

    const result = await Likes.create(json);
    
    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.LIKE_CREATE_FAIL));
        return;
    }

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.LIKE_CREATE_SUCCESS, result));
});

router.get('/', async (req, res) => {
    const boardIdx = Number(req.params.boardIdx);

    if(!boardIdx){
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE('boardIdx')));
        return;
    }

    const result = await Likes.read(boardIdx);

    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.LIKE_READ_FAIL));
        return;
    }

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.LIKE_READ_SUCCESS, result));
});

router.delete('/', async (req, res) => {
    const userIdx = req.body.userIdx;
    const boardIdx = Number(req.params.boardIdx);
    if(!boardIdx || !userIdx){
        const missParameters = Object.entries({userIdx, boardIdx})
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }
    const json = {userIdx, boardIdx};
    const result = await Likes.remove(json);
    
    if(!result || result.affectedRows == '0'){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.LIKE_DELETE_FAIL));
        return;
    }    

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.LIKE_DELETE_SUCCESS, result));
});

module.exports = router;