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

export function getAccounts() {
  return getServerAxios().get(`api/upbit/private/accounts`);
}

export function getMarket(currency = 'ALL') {
  return getServerAxios().get(`api/upbit/public/market/${currency}`);
}

export function getTicker(market) {
  return getServerAxios().get(`api/upbit/public/ticker/${market}`);
}

export function getMinuteCandles(market, minutes, count = 5) {
  return getServerAxios().get(`api/upbit/public/candle/minutes/${market}/${minutes}/${count}`);
}