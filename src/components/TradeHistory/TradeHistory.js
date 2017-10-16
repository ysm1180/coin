import React from 'react';
import styles from '../../styles/TradeHistory.scss';
import classnames from 'classnames/bind';
import TradeQtyChart from '../TradeQtyChart/TradeQtyChart';
const cx = classnames.bind(styles);

const TradeHistory = ({ trades }) => {
  const TIME_MINUTE = 15;

  let tradeSet = [];
  let prevPrice = trades.length > 0 ? trades[0] : '';
  let tradeQtySum = [0, 0, 0]; // 해당 Array 의 element 수에 따라 그래프 표시 개수도 달라짐
  let time = [];
  let lastPrices = [];

  const currentTime = new Date();
  for (let i = 0; i < tradeQtySum.length; ++i) {
    time.push(new Date(currentTime - i * TIME_MINUTE * 60000));
    lastPrices.push(0);
  }

  for (let i = 0; i < trades.length; ++i) {
    const tradeTime = new Date(Number(trades[i].timestamp) * 1000);
    const tradeHour = tradeTime.getHours();
    const tradeMinuteZone = Math.floor(tradeTime.getMinutes() / TIME_MINUTE);

    for (let j = 0; j < tradeQtySum.length; ++j) {
      if (
        time[j].getHours() === tradeHour &&
        Math.floor(time[j].getMinutes() / TIME_MINUTE) === tradeMinuteZone
      ) {
        tradeQtySum[j] += parseFloat(trades[i].qty);
        tradeQtySum[j] = Math.floor(parseFloat(tradeQtySum[j]) * 10000) / 10000;
        lastPrices[j] = trades[i].price;
      }
    }

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

  const labels = [];
  for (let i = 0; i < tradeQtySum.length; ++i) {
    const minuteZone = Math.floor(time[i].getMinutes() / TIME_MINUTE);
    labels.push(
      `${minuteZone * TIME_MINUTE}분 - ${((minuteZone + 1) % 4) * TIME_MINUTE}분`
    );
  }

  return (
    <div className={styles.TradeHistory}>
      <div className={cx('price', 'title')}>체결가</div>
      <div className={cx('qty', 'title')}>거래량</div>
      {tradeSet.map((trade, index) => {
        return (
          <div key={index}>
            <div className={cx('price', 'number', trade.color)}>
              {trade.price}
            </div>
            <div className={cx('qty', 'number', trade.color)}>{trade.qty}</div>
          </div>
        );
      })}
      <TradeQtyChart values={tradeQtySum.reverse()} labels={labels.reverse()} prices={lastPrices.reverse()}/>
    </div>
  );
};

export default TradeHistory;
