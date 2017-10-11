import crypto from 'crypto';
import axios from 'axios';

export default class v2 {
  static request(payload, accessToken, secretKey) {
    payload.access_token = accessToken;
    payload.nonce = Date.now();
    payload = new Buffer(JSON.stringify(payload)).toString('base64');

    const signature = crypto
      .createHmac('sha512', secretKey.toUpperCase())
      .update(payload)
      .digest('hex');

    const headers = {
      'content-type': 'application/json',
      'X-COINONE-PAYLOAD': payload,
      'X-COINONE-SIGNATURE': signature,
    };

    return axios.create({
      baseURL: 'https://api.coinone.co.kr/v2/',
      headers,
      data: payload,
    });
  }
}
