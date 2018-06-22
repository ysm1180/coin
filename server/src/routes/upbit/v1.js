import axios from 'axios';
import { sign } from 'jsonwebtoken';

export const UPBIT_V1_API_URL = 'https://api.upbit.com/v1/'

export default class Upbit {
    static request(accessKey, secretKey) {
        let headers;

        if (accessKey && secretKey) {
            const payload = { access_key: accessKey, nonce: (new Date).getTime() };
            const token = sign(payload, secretKey);
    
            headers = {
                Authorization: `Bearer ${token}`
            };
        } else {
            headers = {
                'content-type': 'application/json',
            };
        }
        
        return axios.create({
            baseURL: UPBIT_V1_API_URL,
            headers,
        });
    }
}
