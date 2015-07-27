var express = require('express');
var router = express.Router();

/* GET list of practice items meta data */
router.get('/practiceItems', function(req, res, next) {
    res.send('respond with an item list');
});

/* GET practice item by id */
router.get('/practiceItems/:itemId', function(req, res, next) {
    res.send('respond with an item');
});

module.exports = router;