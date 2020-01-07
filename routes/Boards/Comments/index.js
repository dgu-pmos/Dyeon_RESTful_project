var express = require('express');
var router = express.Router({mergeParams: true});

const authUtil = require('../../../module/utils/authUtil');
const utils = require('../../../module/utils/utils');
const responseMessage = require('../../../module/utils/responseMessage');
const statusCode = require('../../../module/utils/statusCode');

const Comment = require('../../../model/Comment');

router.post('/', async (req, res) => {
    const {userIdx, content, ref_comment} = req.body;
    const boardIdx = Number(req.params.boardIdx);
    // search miss parameters
    if(!boardIdx || !userIdx || !content){
        const missParameters = Object.entries({boardIdx, userIdx, content})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }

    const json = {boardIdx, userIdx, content, ref_comment};

    const result = await Comment.create(json);
    
    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.COMMENT_CREATE_FAIL));
        return;
    }

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.COMMENT_CREATE_SUCCESS, result));
});

router.put('/:commentIdx', async (req, res) => {
    const {userIdx, content} = req.body;
    const commentIdx = Number(req.params.commentIdx);
    // search miss parameters
    if(!userIdx || !commentIdx || !content){
        const missParameters = Object.entries({userIdx, commentIdx, content})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }

    const json = {commentIdx, userIdx, content};
    
    const result = await Comment.update(json);

    if(!result || result.affectedRows == '0'){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.COMMENT_UPDATE_FAIL));
        return;
    }
    
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.COMMENT_UPDATE_SUCCESS, result));
});

router.get('/', async (req, res) => {
    const boardIdx = Number(req.params.boardIdx);

    if(!boardIdx){
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE('boardIdx')));
        return;
    }

    const result = await Comment.read(boardIdx);

    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.COMMENT_READ_FAIL));
        return;
    }

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.COMMENT_READ_SUCCESS, result));
});

router.delete('/:commentIdx', async (req, res) => {
    const userIdx = req.body.userIdx;
    const commentIdx = Number(req.params.commentIdx);
    if(!commentIdx || !userIdx){
        const missParameters = Object.entries({userIdx, commentIdx})
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }
    const json = {userIdx, commentIdx};
    const result = await Comment.remove(json);
    
    if(!result || result.affectedRows == '0'){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.COMMENT_DELETE_FAIL));
        return;
    }    

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.COMMENT_DELETE_SUCCESS, result));
});

module.exports = router;