import React, { Component } from 'react';
import CoinPrice from '../CoinPrice/CoinPrice';
import * as service from '../../services/coinone';

class Coinone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: {
        btc: '0',
        bch: '0',
        eth: '0',
        etc: '0',
        xrp: '0',
      },
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.fetchCoinonePriceInfo();
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchCoinonePriceInfo = async () => {
    const data = await service.getTicker('all');
    if (data.data.errorCode === '0') {
      const { btc, bch, eth, etc, xrp } = data.data;
      const price = Object.assign({}, this.state.price);

      price.btc = btc.last;
      price.bch = bch.last;
      price.eth = eth.last;
      price.etc = etc.last;
      price.xrp = xrp.last;
      this.setState({
        price,
      });
    }
  };

  render() {
    let { price, delta } = this.state;

    return (
      <div>
        <CoinPrice coin="BTC" color="teal" price={price.btc} />
        <CoinPrice coin="BCH" color="blue" price={price.bch} />
        <CoinPrice coin="ETH" color="violet" price={price.eth} />
        <CoinPrice coin="ETC" color="violet" price={price.etc} />
        <CoinPrice coin="XRP" color="teal" price={price.xrp} />
      </div>
    );
  }
}

export default Coinone;
