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
  }

  componentDidMount() {
    this.fetchCoinonePriceInfo();
    this.fetchCoinoneTradeHistory();
    
    this.priceTimer = setInterval(() => {
      this.fetchCoinonePriceInfo();
    }, 2500);
    this.tradesTimer = setInterval(() => {
      this.fetchCoinoneTradeHistory();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.priceTimer);
    clearInterval(this.tradesTimer);
  }

  fetchCoinoneTradeHistory = async () => {
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
  };

  fetchCoinonePriceInfo = async () => {
    const data = await service.getTicker('all');
    if (data.data.errorCode === '0') {
      const { btc, bch, eth, etc, xrp, qtum } = data.data;
      const price = Object.assign({}, this.state.price);

      price.btc.first = btc.first;
      price.bch.first = bch.first;
      price.eth.first = eth.first;
      price.etc.first = etc.first;
      price.xrp.first = xrp.first;
      price.qtum.first = qtum.first;
      price.btc.last = btc.last;
      price.bch.last = bch.last;
      price.eth.last = eth.last;
      price.etc.last = etc.last;
      price.xrp.last = xrp.last;
      price.qtum.last = qtum.last;
      this.setState({
        price,
      });
    }
  };

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
        />
        <CoinWrapper
          coin="BCH"
          color="teal"
          price={price.bch.last}
          firstPrice={price.bch.first}
          trades={this.state.trades.bch}
        />
        <CoinWrapper
          coin="ETH"
          color="violet"
          price={price.eth.last}
          firstPrice={price.eth.first}
          trades={this.state.trades.eth}
        />
        <CoinWrapper
          coin="ETC"
          color="violet"
          price={price.etc.last}
          firstPrice={price.etc.first}
          trades={this.state.trades.etc}
        />
        <CoinWrapper
          coin="XRP"
          color="orange"
          price={price.xrp.last}
          firstPrice={price.xrp.first}
          trades={this.state.trades.xrp}
        />
        <CoinWrapper
          coin="QTUM"
          color="purple"
          price={price.qtum.last}
          firstPrice={price.qtum.first}
          trades={this.state.trades.qtum}
        />
      </div>
    );
  }
}

export default Coinone;
