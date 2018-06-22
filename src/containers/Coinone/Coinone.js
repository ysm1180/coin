import React, { Component } from 'react';
import { CoinWrapper } from '../../components';
import * as service from '../../services/coinone';

class Coinone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: {
        btc: {
          last: '0',
          first: '0',
        },
        bch: {
          last: '0',
          first: '0',
        },
        eth: {
          last: '0',
          first: '0',
        },
        etc: {
          last: '0',
          first: '0',
        },
        xrp: {
          last: '0',
          first: '0',
        },
        qtum: {
          last: '0',
          first: '0',
        },
      },
      trades: {
        btc: [],
        bch: [],
        eth: [],
        etc: [],
        xrp: [],
        qtum: [],
      },
    };

    this.fetchCoinonePriceInfo = this.fetchCoinonePriceInfo.bind(this);
    this.fetchCoinoneTradeHistory = this.fetchCoinoneTradeHistory.bind(this);
  }

  componentDidMount() {
    this.fetchCoinonePriceInfo();
    this.fetchCoinoneTradeHistory();

    this.priceTimer = setInterval(() => {
      this.fetchCoinonePriceInfo();
    }, 5000);
    this.tradesTimer = setInterval(() => {
      this.fetchCoinoneTradeHistory();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.priceTimer);
    clearInterval(this.tradesTimer);
  }

  async fetchCoinoneTradeHistory() {
    const coin = ['btc', 'bch', 'eth', 'etc', 'xrp', 'qtum'];
    const data = await Promise.all([
      service.getTrades('btc'),
      service.getTrades('bch'),
      service.getTrades('eth'),
      service.getTrades('etc'),
      service.getTrades('xrp'),
      service.getTrades('qtum'),
    ]);

    const trades = {};
    for (let i = 0; i < data.length; ++i) {
      if (data[i].data.errorCode === '0') {
        const { completeOrders } = data[i].data;
        trades[coin[i]] = [...completeOrders];
      } else {
        trades[coin[i]] = [];
      }
    }

    this.setState({
      trades,
    });
  }

  async fetchCoinonePriceInfo() {
    const coin = ['btc', 'bch', 'eth', 'etc', 'xrp', 'qtum'];
    const data = await Promise.all([
      service.getTicker('btc'),
      service.getTicker('bch'),
      service.getTicker('eth'),
      service.getTicker('etc'),
      service.getTicker('xrp'),
      service.getTicker('qtum'),
    ]);

    for (let i = 0; i < data.length; ++i) {
        const ticker = data[i].data;
        const price = Object.assign({}, this.state.price);
        
        price[coin[i]].first = ticker.first;
        price[coin[i]].last = ticker.price;
        this.setState({
          price,
        });
    }
  }

  render() {
    let { price } = this.state;

    return (
      <div>
        <CoinWrapper
          coin="BTC"
          color="teal"
          price={price.btc.last}
          firstPrice={price.btc.first}
          trades={this.state.trades.btc}
          step={500}
        />
        <CoinWrapper
          coin="BCH"
          color="teal"
          price={price.bch.last}
          firstPrice={price.bch.first}
          trades={this.state.trades.bch}
          step={100}
        />
        <CoinWrapper
          coin="ETH"
          color="violet"
          price={price.eth.last}
          firstPrice={price.eth.first}
          trades={this.state.trades.eth}
          step={50}
        />
        <CoinWrapper
          coin="ETC"
          color="violet"
          price={price.etc.last}
          firstPrice={price.etc.first}
          trades={this.state.trades.etc}
          step={10}
        />
        <CoinWrapper
          coin="XRP"
          color="orange"
          price={price.xrp.last}
          firstPrice={price.xrp.first}
          trades={this.state.trades.xrp}
          step={1}
        />
        <CoinWrapper
          coin="QTUM"
          color="purple"
          price={price.qtum.last}
          firstPrice={price.qtum.first}
          trades={this.state.trades.qtum}
          step={10}
        />
      </div>
    );
  }
}

export default Coinone;
