import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Schema = mongoose.Schema;
const alarmSchema = new Schema({
  price: Number,
  coin: String,
  phone: String,
  cnt: Number,
});
const Alarm = mongoose.model('alarm', alarmSchema);

router.post('/set', function(req, res) {
  Alarm.find({
    coin: req.body.coin,
    price: Number(req.body.price),
    phone: req.body.phone,
  })
    .then(alarms => {
      if (alarms.length == 0) {
        const alarm = new Alarm();
        alarm.price = Number(req.body.price);
        alarm.coin = req.body.coin;
        alarm.phone = req.body.phone;
        alarm.cnt = 0;
        return alarm.save().then(err => {
          if (err) {
            console.error(err);
            res.json({ result: 0 });
          } else {
            res.json({ result: 1 });
          }
          return Promise.resolve();
        });
      } else {
        return Alarm.update(
          {
            coin: req.body.coin,
            price: Number(req.body.price),
            phone: req.body.phone,
          },
          {
            $set: { cnt: 0 },
          }
        ).then(err => {
          if (err) {
            console.log(err);
          }
          res.end();
          return Promise.resolve();
        });
      }
    });
});

export default router;
