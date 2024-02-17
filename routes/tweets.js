var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');

// route GET / permet de récupérer l'ensemble des tweets
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

// route POST /newtweet permet d'enregistrer un nouveau tweet en BDD
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

// route PUT /like appelée lorsqu'un tweet est like/dislike :
//      On vérifie si le liker est dans le tableau likers du document tweet :
//      => Si oui, on le retire et on diminue le likeNb de 1
//      => Si non, on l'ajoute et on augmente le likeNb de 1
router.put('/like', (req, res) => {
    const { content, time, token } = req.body;
    User.findOne({ token })
        .then(liker => {
            Tweet.findOne({ content, time })
                .then(tweet => {
                    if(tweet.likers.includes(liker._id)){
                        Tweet.updateOne(
                            { content, time },
                            { likers: this.likers.push(liker._id), likeNb: likeNb++ }
                        ).then(() => res.json({ result: true }));
                    }
                    else{
                        Tweet.updateOne(
                            { content, time },
                            { likers: this.likers.filter(userId => userId !== liker._id), likeNb: likeNb-- }
                        ).then(() => res.json({ result: true }));
                    }
                });
        });
});

module.exports = router;
