import express from 'express';
import Upbit from './v1';

const router = express.Router();

router.get('/market/:currency', function (req, res) {
    Upbit.request().get(`market/all`)
        .then(respond => {
            if (req.params.currency === 'ALL') {
                res.end(JSON.stringify(respond.data));
            } else {
                const market = respond.data.filter((data) => {
                    return data.market.indexOf(`${req.params.currency}-`) > -1;
                })
                res.end(JSON.stringify(market));
            }
        });
});

router.get('/ticker/:market', function (req, res) {
    Upbit.request().get(`ticker?markets=${req.params.market}`)
        .then(respond => {
            res.end(JSON.stringify(respond.data));
        });
});

export default router;