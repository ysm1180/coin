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
      }
    };
  }

  componentDidMount() {
    this.fetchCoinonePriceInfo();
  }

  fetchCoinonePriceInfo = async () => {
    const data = await Promise.all(
      service.getTicker('btc'),
      service.getTicker('bch'),
      service.getTicker('eth')
    );
    const price = Object.assign({}, this.state.price);
    price.btc = data.data.btc;
    price.bch = data.data.bch;
    price.eth = data.data.eth;
    this.setState({
      price
    });
  };
  
  render() {
    return <CoinPrice title="BTC" color="teal" price={this.state.price.btc}></CoinPrice>
  }
}


export default CoinoneContainer;
