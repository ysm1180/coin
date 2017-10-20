import axios from 'axios';

function getServerAxios() {
  const headers = {
    'content-type': 'application/json',
  };
  const instance = axios.create({
    headers,
  });

  return instance;
}

export function getBalance(accessToken, secretKey) {
  return getServerAxios().get(
    `api/coinone/private/balance/${accessToken}/${secretKey}`
  );
}

export function getTicker(coin) {
  return getServerAxios().get(`api/coinone/public/ticker/${coin}`);
}

export function getTrades(coin) {
  return getServerAxios().get(`api/coinone/public/trades/${coin}`);
}

export function postAlarmData(coin, price, phone) {
  return getServerAxios().post('api/coinone/alarm/set', {
    price,
    coin,
    phone,
  });
}
