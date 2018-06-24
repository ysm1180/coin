import React from 'react';
import styles from '../../styles/SimpleCoinPrice.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const CoinWrapper = ({ name, change, price, openPrice }) => (
    <div className={styles.SimpleCoinPrice}>
        <div className={styles.item}>
            <span className={styles.name}>
                {name}
            </span>
            <span className={cx('price', change === 'FALL' ? 'blue' : 'red')}>
                {price}
            </span>
            <span className={cx('percent', change === 'FALL' ? 'blue' : 'red')}>
                {Math.floor((Number(price) / Number(openPrice) - 1) * 10000) / 100}%
            </span>
        </div>
    </div>
);

export default CoinWrapper;