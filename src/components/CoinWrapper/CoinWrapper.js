import React from 'react';
import { CoinPrice, AlarmCoinPrice } from '../../containers';
import TradeHistory from '../TradeHistory/TradeHistory';
import styles from '../../styles/CoinWrapper.scss';

const CoinWrapper = ({
  coin,
  color,
  price,
  firstPrice,
  trades,
  phone,
  step,
}) => (
  <div className={styles.CoinWrapper}>
    <CoinPrice
      coin={coin}
      color={color}
      price={price}
      firstPrice={firstPrice}
    />
    <TradeHistory trades={trades} />
    <AlarmCoinPrice coin={coin} phone={phone} price={price} step={step} />
  </div>
);

export default CoinWrapper;
