var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');

router.get('/', (req, res) =>{
    Tweet.find()
        .populate('editor')
        .then(data => {
            const tweets = data.map(tweet => {
                const { editor, time, content, likeNb } = tweet;
                return ({
                    userImg: editor.userImg,
                    firstname: editor.firstname,
                    username: editor.username,
                    time,
                    content,
                    likeNb
                });
            });
            res.json(tweets);
    });
});

router.post('/newtweet', (req, res) => {
    const { token, content, time, hashtags } = req.body;
    User.findOne({ token })
        .then(user => {
            const newTweet = new Tweet ({editor: user._id, content, time, hashtags, likeNb: 0, likers: [] });
            newTweet.save().then(data => {
                if(data){
                    res.json({result: true});
                } else {
                    res.json({result: false});
                }
            });
        });
});

router.put('/like', (req, res) => {
    const { content, time, token } = req.body;
    User.findOne({ token })
        .then(liker => {
            //Il faut vérifier si le liker est dans le tableau likers du document tweet
            // => Si oui, l'enlever et diminuer likeNb de 1
            // => Si non, l'ajouter et augmenter likeNb de 1
            Tweet.findOne({ content, time })
                .then(tweet => {
                    if(tweet.likers.includes(liker._id)){
                        Tweet.updateOne({ content, time }, { likers: this.likers.push(liker._id), likeNb: likeNb += 1 })
                            .then(() => res.json({ result: true }));
                    }
                    else{
                        Tweet.updateOne({ content, time }, { likers: this.likers.filter(userId => userId !== liker._id), likeNb: likeNb -= 1 })
                            .then(() => res.json({ result: true }));
                    }
                });
        });
});

module.exports = router;
