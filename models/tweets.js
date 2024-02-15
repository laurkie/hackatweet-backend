const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'users' },
    content: String,
    time: Date,
    hashtag: [String],
    likeNb: Number,
    isLiked: Boolean
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;