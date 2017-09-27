import axios from 'axios';

// var ACCESS_TOKEN = '219b23f5-29aa-4f3b-b7f7-cdeabac6c749';
// var SECRET_KEY = '116616dd-59ff-418d-aa49-9c921f33b6b7';
var V1_ACCESS_TOKEN = '0e011fbc-6cdf-4b59-9d1f-3656886ac705';
var baseURL = 'https://api.coinone.co.kr/v1/';

var headers = {
    'content-type':'application/json',
    // 'X-COINONE-PAYLOAD': payload,
    // 'X-COINONE-SIGNATURE': signature
  };
  

export function getBalance() {
    var instance = axios.create({
        baseURL,
        headers
      });
    return instance.get(`account/balance/?access_token=${V1_ACCESS_TOKEN}`)
};
