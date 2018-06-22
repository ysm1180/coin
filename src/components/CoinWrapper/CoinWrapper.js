import React from 'react';
import { CoinPrice } from '../../containers';
import TradeHistory from '../TradeHistory/TradeHistory';
import styles from '../../styles/CoinWrapper.scss';

const CoinWrapper = ({coin, color, price, firstPrice, trades, step}) => (
    <div className={styles.CoinWrapper}>
        <CoinPrice
          coin={coin}
          color={color}
          price={price}
          firstPrice={firstPrice}
        />
        <TradeHistory trades={trades} />
    </div>
);

export default CoinWrapper;