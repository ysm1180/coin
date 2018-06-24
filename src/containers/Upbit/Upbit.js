import React, { Component } from 'react';
import { SimpleCoinPrice } from '../../components'
import * as services from '../../services/upbit';
import styles from '../../styles/Upbit.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

class Upbit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markets: {
                krw: [],
                btc: [],
            },
            tickers: {

            },
        };
    }

    componentDidMount() {
        this.fetchMarketList().then(() => {
            this.fetchCoinTicker();
            setInterval(() => {
                this.fetchCoinTicker();
            }, 100);
        });


    }

    componentWillUnmount() {
    }

    fetchMarketList() {
        return Promise.all([
            services.getMarket('KRW'),
            services.getMarket('BTC'),
        ]).then((data) => {
            const krw = data[0].data;
            const btc = data[1].data;

            const markets = Object.assign({}, this.state.markets);
            markets.krw = krw;
            markets.btc = btc;
            this.setState({
                markets
            });
        });
    }

    fetchCoinTicker() {
        services.getTicker(this.state.markets.krw.map((krw) => krw.market).join(',')).then(data => {
            const ticker = data.data;

            const state = {};
            for (let i = 0; i < ticker.length; i++) {
                state[ticker[i].market] = ticker[i];
            }

            this.setState(prevState => ({
                tickers: {
                    ...prevState.tickers,
                    ...state,
                }
            }))
        });

        services.getTicker(this.state.markets.btc.map((btc) => btc.market).join(',')).then(data => {
            const ticker = data.data;

            const state = {};
            for (let i = 0; i < ticker.length; i++) {
                state[ticker[i].market] = ticker[i];
            }

            this.setState(prevState => ({
                tickers: {
                    ...prevState.tickers,
                    ...state,
                }
            }))
        });
    }

    render() {
        var flexStyle = {
            display: 'flex',
        };

        
        const krw = this.state.markets.krw.slice(0).sort((a, b) => {
            if (this.state.tickers[a.market] && this.state.tickers[b.market]) {
                return this.state.tickers[b.market].trade_price / this.state.tickers[b.market].opening_price - this.state.tickers[a.market].trade_price / this.state.tickers[a.market].opening_price
            } else  {
                return 0;
            }
        });

        const btc = this.state.markets.btc.slice(0).sort((a, b) => {
            if (this.state.tickers[a.market] && this.state.tickers[b.market]) {
                return this.state.tickers[b.market].trade_price / this.state.tickers[b.market].opening_price - this.state.tickers[a.market].trade_price / this.state.tickers[a.market].opening_price
            } else  {
                return 0;
            }
        });

        return (
            <div className={styles.Upbit}>
                <div className={styles.title}>
                    UPBIT
                </div>
                <div style={flexStyle}>
                    <div className={styles.market}>
                        <div className={cx('title', 'krw')}>
                            KRW
                        </div>
                        <div>
                            {krw.map(krw => {
                                if (this.state.tickers[krw.market]) {
                                    return (
                                        <SimpleCoinPrice
                                            key={krw.market}
                                            name={krw.market.replace('KRW-', '')}
                                            change={this.state.tickers[krw.market].change}
                                            price={this.state.tickers[krw.market].trade_price}
                                            openPrice={this.state.tickers[krw.market].opening_price}
                                        />
                                    )
                                } else {
                                    <SimpleCoinPrice
                                        key={krw.market}
                                        name={krw.market.replace('KRW-', '')}
                                        price={0}
                                        openPrice={0}
                                    />
                                }

                            })}
                        </div>
                    </div>

                    <div className={styles.market}>
                        <div className={cx('title', 'btc')}>
                            BTC
                            </div>
                        <div>
                            {btc.map(btc => {
                                if (this.state.tickers[btc.market]) {
                                    return (
                                        <SimpleCoinPrice
                                            key={btc.market}
                                            name={btc.market.replace('BTC-', '')}
                                            change={this.state.tickers[btc.market].change}
                                            price={this.state.tickers[btc.market].trade_price}
                                            openPrice={this.state.tickers[btc.market].opening_price}
                                        />
                                    )
                                } else {
                                    <SimpleCoinPrice
                                        key={btc.market}
                                        name={btc.market.replace('BTC-', '')}
                                        price={0}
                                        openPrice={0}
                                    />
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upbit;