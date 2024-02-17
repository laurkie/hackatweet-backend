var express = require('express');
var router = express.Router();
const User = require('../models/users');
const uid2 = require('uid2');

router.post('/signup', function(req, res) {
  const {firstname, username, password} = req.body;
  User.findOne({ username })
    .then(data => {
      if(data){
        res.json({ result: false, error: 'username already exists' });
      }
      else{
        const token = uid2(32);
        const newUser = new User({ token, firstname, username, password, userImg: 'egg.png'});
        newUser.save()
          .then(user => res.json({ result: true, user }))
            .catch(error => res.json({ result: false, error }));
      }
    });
});

router.post('/signin', function(req, res) {
  const {firstname, username, password} = req.body;
  User.findOne({ firstname, username, password })
    .then(user => {
      user ? res.json({ result: true, user }) : res.json({ result: false, error: 'invalid input' });
    })
});

module.exports = router;
