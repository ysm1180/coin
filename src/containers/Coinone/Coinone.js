import React, { Component } from 'react';
import { CoinWrapper } from '../../components';
import * as service from '../../services/coinone';
import styles from '../../styles/Coinone.scss';

class Coinone extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coinInfo: [],
    };

    this.fetchCoinonePriceInfo = this.fetchCoinonePriceInfo.bind(this);
    this.fetchCoinoneTradeHistory = this.fetchCoinoneTradeHistory.bind(this);

    this.COIN_LIST = [{
      name: 'btc',
      color: 'red',
    },
    {
      name: 'bch',
      color: 'red',
    },
    {
      name: 'eth',
      color: 'teal',
    },
    {
      name: 'etc',
      color: 'teal',
    },
    {
      name: 'xrp',
      color: 'orange',
    },
    {
      name: 'qtum',
      color: 'blue'
    },
    {
      name: 'ltc',
      color: 'grey',
    },
    {
      name: 'iota',
      color: 'purple',
    },
    {
      name: 'btg',
      color: 'yellow',
    },
    {
      name: 'omg',
      color: 'olive'
    },
    {
      name: 'eos',
      color: 'grey',
    },
    {
      name: 'data',
      color: 'green'
    }
    ];
    for (let i = 0; i < this.COIN_LIST.length; i++) {
      this.state.coinInfo.push({
        name: this.COIN_LIST[i].name.toUpperCase(),
        color: this.COIN_LIST[i].color,
      });
    }
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
    const tradesFns = [];
    for (let i = 0; i < this.COIN_LIST.length; i++) {
      tradesFns.push(service.getTrades(this.COIN_LIST[i].name));
    }

    const data = await Promise.all(tradesFns);

    const coinInfo = this.state.coinInfo;
    let trades = [];
    for (let i = 0; i < data.length; ++i) {
      if (data[i].data.errorCode === '0') {
        const { completeOrders } = data[i].data;
        trades = [...completeOrders];
      } else {
        trades = [];
      }

      coinInfo[i].trades = trades;
    }

    this.setState({
      coinInfo,
    });
  }

  async fetchCoinonePriceInfo() {
    const tickerFns = [];
    for (let i = 0; i < this.state.coinInfo.length; i++) {
      tickerFns.push(service.getTicker(this.COIN_LIST[i].name));
    }

    const data = await Promise.all(tickerFns);

    const coinInfo = this.state.coinInfo;
    for (let i = 0; i < data.length; ++i) {
      const ticker = data[i].data;
      const price = {};
      price.first = ticker.first;
      price.last = ticker.price;
      coinInfo[i].price = price;
    }

    this.setState({
      coinInfo,
    });
  }

  render() {
    const coinInfo = this.state.coinInfo.slice(0);
    
    coinInfo.sort((a, b) => {
      if (a.price && b.price) {
        const percentA = Math.floor((Number(a.price.last) / Number(a.price.first) - 1) * 10000) / 100;
        const percentB = Math.floor((Number(b.price.last) / Number(b.price.first) - 1) * 10000) / 100;

        return percentB - percentA;
      } else {
        return 0;
      }
    });

    return (
      <div className={styles.Coinone}>
        <div className={styles.title}>
          COINONE
          </div>
        <div>
          {coinInfo.map((info) => {
            if (info.price && info.trades) {
              return (<CoinWrapper 
                key={info.name}
                coin={info.name.toUpperCase()}
                color={info.color}
                price={info.price.last}
                firstPrice={info.price.first}
                trades={info.trades}
              />
              );
            } else {
              return (
                <div key={info.name} />
              )
            }
          })}
        </div>
      </div>
    );
  }
}

export default Coinone;
