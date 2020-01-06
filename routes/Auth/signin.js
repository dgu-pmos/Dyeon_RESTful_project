var express = require('express');
var router =  express.Router({mergeParams: true});

router.post('/', async(req, res) => {
    /*
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.X_NULL_VALUE(missParameters)));
    return;
    */
    res.status(statusCode.OK).send(utils.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result));
});

module.exports = router;