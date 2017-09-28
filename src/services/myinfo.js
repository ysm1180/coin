import axios from "axios";

export function getBalance() {
  var V1_ACCESS_TOKEN = "0e011fbc-6cdf-4b59-9d1f-3656886ac705";
  var baseURL = "https://api.coinone.co.kr/v1/";

  var headers = {
    "content-type": "application/json",
  };

  var instance = axios.create({
    baseURL,
    headers,
  });

  return instance.get(`account/balance/?access_token=${V1_ACCESS_TOKEN}`);
}
