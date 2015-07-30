var express = require('express');
var router = express.Router();

var PracticeItem = require('../models/practiceItem');

/* GET list of practice items meta data */
router.get('/practiceItems', function(req, res, next) {
    // exclude actual tab/lyric/media data, just send back meta data
    var query = PracticeItem.find({}, {
        mediaId: 0,
        tabData: 0,
        lyricData: 0
    });

    query.exec(function(err, items) {
        if(err) return next(err);
        res.status(200).json(items);
    });
});

/* GET practice item by id */
router.get('/practiceItems/:itemId', function(req, res, next) {

    var query = PracticeItem.find({ _id: { $eq: req.params.itemId }});

    query.exec(function(err, items) {
        if(err) return next(err);
        res.status(200).json(items[0]);
    });
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
        res.status(200).json(practiceItem);
    })
});

module.exports = router;