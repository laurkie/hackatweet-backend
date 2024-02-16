const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    editor: { type: mongoose.Schema.Types.ObjectId, ref:'users' },
    content: String,
    time: Date,
    hashtags: [String],
    likeNb: Number,
    likers: [{ type: mongoose.Schema.Types.ObjectId, ref:'users' }]
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;