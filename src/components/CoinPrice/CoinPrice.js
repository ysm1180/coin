import React from 'react';
import styles from '../../styles/CoinPrice.scss';

const CoinPrice = ({title}) => (
    <div className={styles.CoinPrice}>
        {title}
    </div>
);

export default CoinPrice;
