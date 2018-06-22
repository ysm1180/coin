import express from 'express';
import Upbit from './v1';

const router = express.Router();

router.get('/market/:currency', function (req, res) {
    Upbit.request().get(`market/all`)
        .then(respond => {
            if (req.params.currency === 'ALL') {
                res.end(JSON.stringify(respond.data));
            }
        });
});


export default router;