import express from 'express';
import v2 from './v2';

const router = express.Router();

router.get('/balance/:token/:secret', function(req, res) {
  v2
    .request({}, req.params.token, req.params.secret)
    .post('account/balance')
    .then(respond => {
      res.end(JSON.stringify(respond.data));
    })
    .catch((reason) => {
      res.end(JSON.stringify(reason));
    });
});

export default router;
