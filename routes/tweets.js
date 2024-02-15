var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');

router.get('/', (req, res) =>{
    Tweet.find().then(data => {
        res.json(data);
    })
})

router.post('/newtweet', (req, res) => {
    const newTweet = new Tweet ({
        user: req.body.user,
        content: req.body.content,
        timestamp: req.body.timestamp,
        likeNb: req.body.likeNb,
        isLiked: req.body.isLiked,
        hashtags: req.body.hashtags
    })
})

module.exports = router;
