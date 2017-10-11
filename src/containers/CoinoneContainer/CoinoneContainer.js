import React, { Component } from 'react';
import { CoinPrice } from '../../components';
import * as service from '../../services/coinone';

class CoinoneContainer extends Component {
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
      delta: {
        btc: '',
        bch: '',
        eth: '',
        etc: '',
        xrp: '',
      },
      start: false,
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
    if (data.data.errorCode == '0') {
      const price = Object.assign({}, this.state.price);
      price.btc = data.data.btc.last;
      price.bch = data.data.bch.last;
      price.eth = data.data.eth.last;
      price.etc = data.data.etc.last;
      price.xrp = data.data.xrp.last;
      this.setState({
        price,
      });
    }
  };

  render() {
    let { price, delta } = this.state;

    return (
      <div>
        <CoinPrice
          title="BTC"
          color="teal"
          price={price.btc}
          delta={delta.btc}
        />
        <CoinPrice
          title="BCH"
          color="blue"
          price={price.bch}
          delta={delta.bch}
        />
        <CoinPrice
          title="ETH"
          color="violet"
          price={price.eth}
          delta={delta.eth}
        />
        <CoinPrice
          title="ETC"
          color="violet"
          price={price.etc}
          delta={delta.etc}
        />
        <CoinPrice
          title="XRP"
          color="teal"
          price={price.xrp}
          delta={delta.xrp}
        />
      </div>
    );
  }
}

export default CoinoneContainer;
