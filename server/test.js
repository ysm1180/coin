var express = require('express');
var crypto = require('crypto');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

const app = express();

app.use(cors());

app.set('views', path.join(__dirname,  '..', 'build'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,  '..', 'build')));


app.get('/', function (req, res) {  
  var ACCESS_TOKEN = '219b23f5-29aa-4f3b-b7f7-cdeabac6c749';
  var SECRET_KEY = '116616dd-59ff-418d-aa49-9c921f33b6b7';
  var url = 'https://api.coinone.co.kr/v2/account/balance/';
    var payload = {
    "access_token": ACCESS_TOKEN,
    "nonce": Date.now()
  };
  
  payload = new Buffer(JSON.stringify(payload)).toString('base64');
  
  var signature = crypto
    .createHmac("sha512", SECRET_KEY.toUpperCase())
    .update(payload)
    .digest('hex');
  
  var headers = {
    'content-type':'application/json',
    'X-COINONE-PAYLOAD': payload,
    'X-COINONE-SIGNATURE': signature
  };
  
  var options = {
    url: url,
    headers: headers,
    body: payload
  };
  
  request.post(options,
    function(error, response, body) {
      console.log(body);
  });

  res.render('index.html');
});

app.listen(4500);