import express from 'express';
import Upbit from './v1';

const accessKey = '8i1BWKhu4GngIh9Rr5fi7w7HsLJbB8otocj5oGpa';
const secretKey = '5VbdB9RQwkU6qMtOxhn3Ieohre8KJMp1AxI29kQT';
const router = express.Router();

router.get('/accounts', function (req, res) {
    Upbit.request(accessKey, secretKey).get(`accounts`)
        .then(respond => {
            res.end(JSON.stringify(respond.data));
        });
});


export default router;
