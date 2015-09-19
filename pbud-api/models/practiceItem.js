var mongoose = require('mongoose');

// DB just flat items for now
var practiceItemSchema = new mongoose.Schema({
    title: String,
    artist: String,
    progress: Number,
    lastPlayed: Date,
    playCount: Number,
    mediaId: String,
    tabData: String,
    lyricData: String,
    notes: String
});

module.exports = mongoose.model('PracticeItem', practiceItemSchema);