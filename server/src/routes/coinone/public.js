import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';

const router = express.Router();
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  coin: String,
  price: Number,
  timestamp: Number,
  first: Number,
  dayVolume: Number,
});
const Record = mongoose.model('record', recordSchema);

router.get('/trades/:coin', function(req, res) {
  var headers = {
    'content-type': 'application/json',
  };

  var instance = axios.create({
    baseURL: 'https://api.coinone.co.kr/',
    headers,
  });

  instance
    .get(`trades/?currency=${req.params.coin}&period=hour`)
    .then(respond => {
      console.log('GET TRADES');
      res.end(JSON.stringify(respond.data));
    })
    .catch(reason => {
      console.log('FAIL TO GET TRADES');
      res.end(
        JSON.stringify({
          errorCode: '4',
        })
      );
    });
});

router.get('/ticker/:coin', function(req, res) {
  Record.find({ coin: req.params.coin })
    .sort('-timestamp')
    .limit(1)
    .exec(function(err, records) {
      console.log(records[0]);
      res.end(JSON.stringify(records[0]));
    });
});

export default router;
