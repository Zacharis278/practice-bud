var express = require('express');
var router = express.Router();

var PracticeService = require('../services/practiceService');
var PracticeItem = require('../models/practiceItem');

/* GET list of practice items meta data */
router.get('/practiceItems', function(req, res, next) {

    PracticeService.getItemList(function(err, items) {
        if(err) return next(err);
        res.status(200).json(items);
    });
});

/* GET practice item by id */
router.get('/practiceItems/:itemId', function(req, res, next) {

    PracticeService.getItemById(req.params.itemId, function(err, item) {
        if(err) return next(err);
        res.status(200).json(item);
    });
});

/* DELETE practice item by id */
router.delete('/practiceItems/:itemId', function(req, res, next) {

    // don't actually delete right now just in case
    PracticeService.updateItem(req.params.itemId, 'markDelete', true, function(err) {
        if(err) return next(err);

        res.status(200).json({ message: 'Item successfully updated'});
    });

});

/* PUT update to existing item */
router.put('/practiceItems/:itemId/:field', function (req, res, next) {

    var field = req.params.field;
    var itemId = req.params.itemId;
    var value = req.body.value;

    PracticeService.updateItem(itemId, field, value, function(err) {
        if(err) return next(err);

        res.status(200).json({ message: 'Item successfully updated'});
    });
});

//TODO: move service logic
/* POST new practice item */
router.post('/practiceItems', function (req, res, next) {

    var item = req.body;

    // just create an item, no validation yet
    var practiceItem = new PracticeItem({
        title: item.title || '',
        artist: item.artist || '',
        progress: item.progress || 0,
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

/* POST new session */
router.post('/practiceItems/:itemId/sessions', function (req, res, next) {

    PracticeService.saveNewSession(req.params.itemId, req.body.evaluation, function(err) {
        if(err) return next(err);

        res.status(200).json({ message: 'Session saved!'});
    });
});

module.exports = router;