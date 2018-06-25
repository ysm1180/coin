import express from 'express';
import axios from 'axios';

const router = express.Router();

let tickerData = null;
let priceData = {};

router.get('/trades/:coin', function (req, res) {
  var headers = {
    'content-type': 'application/json',
  };

  var instance = axios.create({
    baseURL: 'https://api.coinone.co.kr/',
    headers,
  });

  instance
    .get(`trades/?currency=${req.params.coin}&period=day`)
    .then(respond => {
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

function getTicker() {
  var headers = {
    'content-type': 'application/json',
  };

  var instance = axios.create({
    baseURL: 'https://api.coinone.co.kr/',
    headers,
  });

  return instance
    .get(`ticker/?currency=ALL`)
    .then(respond => {
      return Promise.resolve(JSON.stringify(respond.data));
    })
    .catch(reason => {
      console.log('FAIL');
      return Promise.resolve(
        JSON.stringify({
          errorCode: '4',
        })
      );
    });
}

router.get('/ticker/:coin', function (req, res) {
  if (!tickerData || priceData[req.params.coin] === 1) {
    getTicker()
    .then((response) => {
      response = JSON.parse(response);
      tickerData = response;

      if (response.errorCode === '0') {
        var data = {};

        data.first = response[req.params.coin].first || 1;
        data.price = response[req.params.coin].last || 1;

        priceData = {};
        priceData[req.params.coin] = 1;
        res.end(JSON.stringify(data));
      } else {
        res.end(
          JSON.stringify({
            errorCode: '4',
          })
        );
      }
    });
  } else {
    const data = {};
    data.first = tickerData[req.params.coin].first || 1;
    data.price = tickerData[req.params.coin].last || 1;
    res.end(JSON.stringify(data));
  }
});

export default router;
