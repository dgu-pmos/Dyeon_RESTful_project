var express = require('express');
var router = express.Router({mergeParams: true});

const authUtil = require('../../module/utils/authUtil');
const utils = require('../../module/utils/utils');
const responseMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const Board = require('../../model/Board');

router.use('/:boardIdx/comments', require('./Comments'));
router.use('/:boardIdx/likes', require('./Likes'));

// router.post('/', authUtil.validToken, async (req, res) => {
router.post('/', async (req, res) => {
    const {userIdx, title, content, active} = req.body;
    // search miss parameters
    if(!userIdx || !title || !content || !active){
        const missParameters = Object.entries({userIdx, title, content, active})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }

    const json = {userIdx, title, content, active};
    
    const result = await Board.create(json);
    
    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.BOARD_CREATE_FAIL));
        return;
    }

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));
});

// router.put('/', authUtil.validToken, async (req, res) => {
router.put('/:boardIdx', async (req, res) => {
    const {userIdx, title, content, active} = req.body;
    const boardIdx = Number(req.params.boardIdx);
    // search miss parameters
    if(!userIdx || !boardIdx){
        const missParameters = Object.entries({userIdx, boardIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }

    const json = {boardIdx, userIdx, title, content, active};
    
    const result = await Board.update(json);
    if(!result || result.affectedRows == '0'){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.BOARD_UPDATE_FAIL));
        return;
    }
    
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_UPDATE_SUCCESS, result));
});

router.get('/', async (req, res) => {
    const result = await Board.readAll();

    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.BOARD_READ_ALL_FAIL));
        return;
    }

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, result));
});

router.get('/:boardIdx', async (req, res) => {
    const boardIdx = Number(req.params.boardIdx);
    if(!boardIdx){
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE('boardIdx')));
        return;
    }

    const result = await Board.read(boardIdx);

    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.BOARD_READ_FAIL));
        return;
    }
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_READ_SUCCESS, result));
});

// router.delete('/', authUtil.validToken, async (req, res) => {
router.delete('/:boardIdx', async (req, res) => {
    const userIdx = req.body.userIdx;
    const boardIdx = Number(req.params.boardIdx);
    if(!boardIdx || !userIdx){
        const missParameters = Object.entries({userIdx, boardIdx})
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }
    const json = {userIdx, boardIdx};
    const result = await Board.remove(json);
    
    if(!result || result.affectedRows == '0'){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.BOARD_DELETE_FAIL));
        return;
    }    

    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_DELETE_SUCCESS, result));
});

module.exports = router;