import React, { Component } from 'react';
import { Label, Icon } from 'semantic-ui-react';
import styles from '../../styles/CoinPrice.scss';

class CoinPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delta: '0',
      deltaColor: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const variation = Number(nextProps.price) - Number(this.props.price);
    let deltaColor,
      unary = '';
    if (variation > 0) {
      deltaColor = 'blue';
      unary = '+';
    } else if (variation < 0) {
      deltaColor = 'red';
    } else {
      deltaColor = '';
    }
    if (variation !== 0) {
      const delta = `${unary}${variation}`;
      this.setState({
        delta,
        deltaColor,
      });
    }
  }

  _numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    let { coin, price, color } = this.props;
    let { delta, deltaColor } = this.state;
    price = this._numberWithCommas(price);

    return (
      <div className={styles.CoinPrice}>
        <div className={styles.title}>
          <Label color={color} horizontal>
            {title}
          </Label>
          <Icon name="won" />
          <span>{price}</span>
          <Label color={deltaColor} floating>
            {delta}
          </Label>
        </div>
      </div>
    );
  }
}

export default CoinPrice;
