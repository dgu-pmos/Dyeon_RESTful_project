var express = require('express');
var router =  express.Router({mergeParams: true});
/* GET home page. */
router.use('/signin', require('./signin'));
router.use('/singup', require('./signup'));
router.get('/', (req, rus) => {
    res.render('index', {title: "login page"})
});
module.exports = router;
