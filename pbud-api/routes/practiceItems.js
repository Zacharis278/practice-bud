var express = require('express');
var router = express.Router();

var PracticeItem = require('../models/practiceItem');

/* GET list of practice items meta data */
router.get('/practiceItems', function(req, res, next) {
    var query = PracticeItem.find();

    // just list all
    query.exec(function(err, item) {
        if(err) return next(err);
        res.send(item);
    });
});

/* GET practice item by id */
router.get('/practiceItems/:itemId', function(req, res, next) {
    res.send('respond with an item');
});

/* POST new practice item */
router.post('/practiceItems', function (req, res, next) {

    var item = req.body;

    // just create an item, no validation yet
    var practiceItem = new PracticeItem({
        _id: 1,
        title: item.title,
        artist: item.artist,
        progress: item.progress,
        lastPlayed: null,
        playCount: 0,
        mediaId: item.mediaId,
        tabData: item.tabData,
        lyricData: item.lyricData
    });

    practiceItem.save(function(err) {
        if(err) {
            return next(err);
        }

        // echo back on success for now
        res.send(200, practiceItem);
    })
});

module.exports = router;