import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/ticker/:coin', function(req, res) {
  var headers = {
    'content-type': 'application/json'
  };

  var instance = axios.create({
    baseURL: 'https://api.coinone.co.kr/',
    headers
  });

  instance
    .get(`ticker/?currency=${req.params.coin}`)
    .then(respond => {
      res.end(JSON.stringify(respond.data));
    })
    .catch(reason => {
      res.end(JSON.stringify(reason));
    });
});

export default router;
