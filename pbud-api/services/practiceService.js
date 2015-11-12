var async = require('async');

var PracticeItem = require('../models/practiceItem');

var PracticeService = {
    getItemList: getItemList,
    getItemById: getItemById,
    updateItem: updateItem,
    saveNewSession: saveNewSession
};

function getItemList(next) {
    // exclude actual tab/lyric/media data, just send back meta data
    var query = PracticeItem.find({}, {
        mediaId: 0,
        tabData: 0,
        lyricData: 0
    });

    query.exec(function(err, items) {
        if(err) return next(err);

        next(null, items);
    });
}

function getItemById(itemId, next) {
    var query = PracticeItem.find({ _id: { $eq: itemId }});

    return query.exec(function(err, items) {
        if(err) return next(err);

        next(null, items[0]);
    });
}

function updateItem(itemId, field, value, next) {

    async.waterfall([
        function(done) {
            getItemById(itemId, done)
        },
        function(item, done) {
            item[field] = value;
            item.save(function(err, item) {
                if(err) return next(err);   // TODO: DB error handle

                done(null, item)
            });
        }
    ], next);
}

function saveNewSession(itemId, eval, next) {

    var sessionMax = 0;
    var sessionRating = 0;
    eval.forEach(function(category) {
        sessionRating += category.rating * category.weight;
        sessionMax += 5 * category.weight;
    });
    sessionRating = sessionRating / sessionMax;

    async.waterfall([
        function(done) {
            getItemById(itemId, done)
        },
        function(item, done) {

            // progress is average of last 5 sessions
            // TODO: maybe make larger range but logarithmic
            item.progress = (sessionRating + (item.progress||0) * Math.max(item.playCount, 5)) / Math.max(++item.playCount,5);
            item.lastPlayed = new Date();

            item.save(function(err, item) {
                if(err) return next(err);   // TODO: DB error handle

                done(null, item)
            });
        }
    ], next);
}

module.exports = PracticeService;