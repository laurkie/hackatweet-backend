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
        user: req.body.userId,
        content: req.body.content,
        time: req.body.time,
        hashtags: req.body.hashtags,
        likeNb: req.body.likeNb,
        isLiked: req.body.isLiked,
    })
    newTweet.save().then(data => {
        if(data){
            res.json({result: true, tweet: data});
        } else {
            res.json({result: false});
        }
    })
})

/* 
router.put('/isLiked', (req, res) => {
    Tweet.updateOne({content: req.body.content, time: req.body.time}, {isLiked: req.body.isLiked}).then()
})
*/

module.exports = router;
