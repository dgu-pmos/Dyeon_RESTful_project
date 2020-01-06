var express = require('express');
var router = express.Router({mergeParams: true});

const authUtil = require('../../module/utils/authUtil');
const utils = require('../../module/utils/utils');
const responseMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');

router.use('/:boardIdx/comments', require('./Comments'));

// router.post('/', authUtil.validToken, async (req, res) => {
router.post('/', async (req, res) => {
    /*
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
    return;
    */
    const result = 'ok';
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));
});

// router.put('/', authUtil.validToken, async (req, res) => {
router.put('/', async (req, res) => {
    /*
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
    return;
    */
    const result = 'ok';
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));
});

router.get('/', async (req, res) => {
    /*
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
    return;
    */
    const result = 'ok';
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));
});

router.get('/:boardIdx', async (req, res) => {
    /*
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
    return;
    */
    const result = 'ok';
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));
});

// router.delete('/', authUtil.validToken, async (req, res) => {
router.delete('/', async (req, res) => {
    /*
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
    return;
    */
    const result = 'ok';
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));
});

module.exports = router;