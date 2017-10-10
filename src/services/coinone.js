import axios from "axios";

function getServerAxios() {
  const headers = {
    "content-type": "application/json",
  };
  const instance = axios.create({
    headers,
  });

  return instance;
}

export function getBalance(accessToken, secretKey) {
  return getServerAxios().get(`coinone/private/balance/${accessToken}/${secretKey}`);
}

export function getTicker(coin) {
  return getServerAxios().get(`coinone/public/ticker/${coin}`);
}