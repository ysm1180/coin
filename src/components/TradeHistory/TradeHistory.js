import React from 'react';
import styles from '../../styles/TradeHistory.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const TradeHistory = ({ trades }) => {
  let tradeSet = [];
  let prevPrice = trades.length > 0 ? trades[0] : '';
  for (let i = 0; i < trades.length; ++i) {
    if (prevPrice !== trades[i].price) {
      let color = '';
      if (Number(prevPrice) > trades[i].price) {
        color = 'blue';
      } else {
        color = 'red';
      }

      tradeSet.unshift({
        color,
        price: trades[i].price,
        qty: trades[i].qty,
      });
    } else {
      let sum = parseFloat(tradeSet[0].qty) + parseFloat(trades[i].qty);
      sum = Math.floor(sum * 10000) / 10000;
      tradeSet[tradeSet.length - 1].qty = sum.toString();
    }
    prevPrice = trades[i].price;
  }

  tradeSet = tradeSet.slice(0, 10);
  return (
    <div className={styles.TradeHistory}>
      <div className={cx('price', 'title')}>체결가</div>
      <div className={cx('qty', 'title')}>거래량</div>
      {tradeSet.map(trade => {
        return (
          <div>
            <div className={cx('price', 'number', trade.color)}>
              {trade.price}
            </div>
            <div className={cx('qty', 'number', trade.color)}>{trade.qty}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TradeHistory;
