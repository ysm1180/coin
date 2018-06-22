import express from 'express';
import Upbit from './v1';

const accessKey = 'tOHFDHuXLxQXaK5YeKgZ0oob16El122e1TGMjUiw';
const secretKey = 'Cotvcjym2xYUqsUhBx1xD7Y1xFAiJnuANSSeC3Pc';
const router = express.Router();

router.get('/accounts', function (req, res) {
    Upbit.request(accessKey, secretKey).get(`accounts`)
        .then(respond => {
            res.end(JSON.stringify(respond.data));
        });
});


export default router;
