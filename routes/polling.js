const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: "1402037",
    key: "413b3ab19b7602c1f745",
    secret: "4866d0f11a6013bcaed9",
    cluster: "ap2",
    useTLS: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success: true, votes: votes }));
  });
  
    router.post('/', (req, res) => {
        const newVote = {
        os: req.body.os,
        points: 1
        };
  
    new Vote(newVote).save().then(vote => {
      pusher.trigger('Polling-System', 'Voting', {
        points: parseInt(vote.points),
        os: vote.os
      });
  
      return res.json({ success: true, message: 'Thank you for voting' });
    }).catch(err => {console.log(err)});
  });
  
  module.exports = router;