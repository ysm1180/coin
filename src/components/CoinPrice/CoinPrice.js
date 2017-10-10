import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import styles from '../../styles/CoinPrice.scss';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CoinPrice = ({ title, price, color }) => {
  price = numberWithCommas(price);

  return (
    <div className={styles.CoinPrice}>
      <div className={styles.title}>
        <Label color={color} horizontal>
          {title}
        </Label>
        <Icon name="won" />
        <span>{price}</span>
      </div>
    </div>
  );
};

export default CoinPrice;
