import React, { Component } from 'react';
import { Label, Icon } from 'semantic-ui-react';
import styles from '../../styles/CoinPrice.scss';

class CoinPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delta: '0',
      deltaColor: 'grey',
    };
  }

  shouldComponentUpdate(nextProps, nextStates) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextStates)
    );
  }

  componentWillReceiveProps(nextProps) {
    const variation = Number(nextProps.price) - Number(this.props.price);
    let deltaColor,
      unary = '';
    if (variation > 0) {
      deltaColor = 'red';
      unary = '+';
    } else if (variation < 0) {
      deltaColor = 'blue';
    } else {
      deltaColor = 'grey';
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
    if (typeof x === 'string') {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return 1;
    }
  }

  render() {
    let { coin, price, color, firstPrice } = this.props;
    let { delta, deltaColor } = this.state;
    const dayPercent =
      Math.floor((Number(price) / Number(firstPrice) - 1) * 10000) / 100;
    price = this._numberWithCommas(price);

    return (
      <div className={styles.CoinPrice}>
        <div className={styles.title}>
          <Label color={color} horizontal>
            {coin}
          </Label>
          <Icon name="won" />
          <span>{price}</span>
          <Label color={deltaColor} floating>
            {delta}
          </Label>
        </div>
        <div className={styles.content}>
          <Label horizontal color="pink">
            기준 대비
          </Label>
          <span className={(dayPercent > 0 ? styles.txtRed : styles.txtBlue)}>{dayPercent}%</span>
        </div>
      </div>
    );
  }
}

export default CoinPrice;
