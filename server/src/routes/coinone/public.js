import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';

const router = express.Router();

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
  var headers = {
    'content-type': 'application/json',
  };

  var instance = axios.create({
    baseURL: 'https://api.coinone.co.kr/',
    headers,
  });

  instance
    .get(`ticker/?currency=${req.params.coin}`)
    .then(respond => {
      console.log('GET TICKER');
      res.end(JSON.stringify(respond.data));
    })
    .catch(reason => {
      console.log('FAIL');
      res.end(
        JSON.stringify({
          errorCode: '4',
        })
      );
    });
});

export default router;
