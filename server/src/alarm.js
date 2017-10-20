var axios = require('axios');
var twilio = require('twilio');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var alarmSchema = new Schema({
    price: Number,
    coin: String,
    phone: String,
    cnt: Number,
});
var Alarm = mongoose.model('alarm', alarmSchema);
var coinSchema = new Schema({
    coin: String,
    price: Number,
    timestamp: Number,
    first: Number,
    dayVolume: Number
});
var Coin = mongoose.model('record', coinSchema);
var accountSid = ''; // Your Twillo account sid
var authToken = ''; // Your Twillo auth token
var client = new twilio(accountSid, authToken);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('connected');
});
mongoose.connect('mongodb://192.168.10.156/coin'); // Your MongoDB Server IP

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
            console.log('GET TICKER');
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

function recordCoin(data) {
    var coins = ['btc', 'bch', 'eth', 'etc', 'xrp', 'qtum'];

    for (var i = 0; i < coins.length; ++i) {
        var coin = new Coin();
        coin.coin = coins[i];
        coin.price = Number(data[coins[i]].last);
        coin.first = Number(data[coins[i]].first);
        coin.timestamp = Number(data.timestamp);
        coin.dayVolume = parseFloat(data[coins[i]].volume);
        coin.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}


function postMessage() {
    var coinData;
    getTicker()
        .then((res) => {
            res = JSON.parse(res);
            if (res.errorCode === '0') {
                recordCoin(res);
                coinData = res;
                return Alarm.find();
            } else {
                return Promise.resolve([]);
            }
        })
        .then((alarms) => {
            for (var i = 0; i < alarms.length; ++i) {
                var coin = alarms[i].coin.toLowerCase();
                if (Number(coinData[coin].last) === alarms[i].price &&
                    alarms[i].phone.length > 0 && alarms[i].cnt === 0) {
console.log("UPDATE");
                                client.messages.create({
                                    body: `${alarms[i].coin} - ${alarms[i].price}`,
                                    to: '+' + alarms[i].phone,  // Text this number
                                    from: '+13867533757' // From a valid Twilio number
                                });
                    Alarm.update({coin: alarms[i].coin, price: alarms[i].price, phone: alarms[i].phone},
                        { "$set": { "cnt": 1 }}).then((err) => {
                        });
                }
            }
        });
}

setInterval(postMessage, 2500);

