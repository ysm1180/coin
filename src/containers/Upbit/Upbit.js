import React, { Component } from 'react';
import SimpleCoinPrice from '../SimpleCoinPrice/SimpleCoinPrice'
import MyInfoContainer from '../MyInfoContainer/MyInfoContainer';
import CoinChart from '../CoinChart/CoinChart'
import * as services from '../../services/upbit';
import styles from '../../styles/Upbit.scss';
import classnames from 'classnames/bind';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const cx = classnames.bind(styles);

class Upbit extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            markets: {
                krw: [],
                btc: [],
            },
            tickers: {

            },
            candles: {

            },
            selectedMarket: {
                krw: {},
                btc: {},
            },
            canvasContainerSize: [],
        };

        this.fetchMarketList = this.fetchMarketList.bind(this);
        this.fetchCoinTicker = this.fetchCoinTicker.bind(this);


    }

    componentDidMount() {
        this.sizingEvent = () => {
            const size = [0, 0];
            size[0] = this.refs.canvasContainer.clientWidth;
            size[1] = this.refs.canvasContainer.clientHeight;

            this.setState({
                canvasContainerSize: size,
            });
        };
        this.sizingEvent();
        window.addEventListener('resize', this.sizingEvent);

        this.fetchMarketList().then(() => {
            this.fetchCoinCandle();
            this.fetchCoinTicker();
            this.coinTicker = setInterval(() => {
                this.fetchCoinTicker();
            }, 2000);
            this.coinCandle = setInterval(() => {
                this.fetchCoinCandle();
            }, 2000);
        });
    }

    componentWillUnmount() {
        clearInterval(this.coinTicker);
        clearInterval(this.coinCandle);
        window.removeEventListener('resize', this.sizingEvent);
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

            const { cookies } = this.props;
            krw.map((krw) => {
                const value = cookies.get(krw.market) || null;
                if (value === 'true') {
                    const selectedMarket = Object.assign({}, this.state.selectedMarket);
                    selectedMarket.krw[krw.market] = true;
                    this.setState({
                        selectedMarket,
                    });
                }
            });
        });
    }

    fetchCoinTicker() {
        const all = this.state.markets.krw.concat(this.state.markets.btc);

        services.getTicker(all.map((info) => info.market).join(',')).then(data => {
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
            }));
        });
    }

    fetchCoinCandle() {
        for (const market in this.state.selectedMarket.krw) {
            services.getMinuteCandles(market, 15, Math.floor(this.state.canvasContainerSize[0] / 40)).then((data) => {
                const candles = data.data;

                const state = {};
                state[market] = candles;

                this.setState(prevState => ({
                    candles: {
                        ...prevState.candles,
                        ...state,
                    }
                }));
            });
        }
    }

    onClick(currency, market) {
        const { cookies } = this.props;

        if (this.state.selectedMarket[currency][market]) {
            delete this.state.selectedMarket[currency][market];
            cookies.remove(market);
        } else {
            this.state.selectedMarket[currency][market] = true;
            cookies.set(market, 'true', { path: '/' });
            this.fetchCoinCandle();
        }
    }

    render() {
        var flexStyle = {
            display: 'flex',
        };

        var inlineBlockStyle = {
            display: 'inline-block',
        };

        const krw = this.state.markets.krw.slice(0).sort((a, b) => {
            if (this.state.tickers[a.market] && this.state.tickers[b.market]) {
                return this.state.tickers[b.market].trade_price / this.state.tickers[b.market].prev_closing_price - this.state.tickers[a.market].trade_price / this.state.tickers[a.market].prev_closing_price
            } else {
                return 0;
            }
        });

        const btc = this.state.markets.btc.slice(0).sort((a, b) => {
            if (this.state.tickers[a.market] && this.state.tickers[b.market]) {
                return this.state.tickers[b.market].trade_price / this.state.tickers[b.market].prev_closing_price - this.state.tickers[a.market].trade_price / this.state.tickers[a.market].prev_closing_price
            } else {
                return 0;
            }
        });

        return (
            <div className={styles.Upbit}>
                <div className={styles.title}>
                    <div style={inlineBlockStyle}>
                        UPBIT
                    </div>
                    <MyInfoContainer />
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
                                            currency='krw'
                                            market={krw.market}
                                            name={krw.market.replace('KRW-', '')}
                                            change={this.state.tickers[krw.market].change}
                                            price={this.state.tickers[krw.market].trade_price}
                                            lastPrice={this.state.tickers[krw.market].prev_closing_price}
                                            onClick={this.onClick.bind(this)}
                                            selected={this.state.selectedMarket.krw[krw.market]}
                                        />
                                    );
                                } else {
                                    return (
                                        <div />
                                    );
                                }
                            })}
                        </div>

                        <div ref="canvasContainer">
                            {(() => {
                                const charts = [];
                                for (const market in this.state.selectedMarket.krw) {
                                    charts.push(
                                        <CoinChart
                                            width={this.state.canvasContainerSize[0] / 2 - 10}
                                            height={200}
                                            data={this.state.candles[market]}
                                        />
                                    );
                                }

                                return (
                                    <div>
                                        {charts}
                                    </div>
                                );
                            })()}

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
                                            currency='btc'
                                            market={btc.market}
                                            name={btc.market.replace('BTC-', '')}
                                            change={this.state.tickers[btc.market].change}
                                            price={this.state.tickers[btc.market].trade_price}
                                            lastPrice={this.state.tickers[btc.market].prev_closing_price}
                                        />
                                    )
                                } else {
                                    return (
                                        <div />

                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(Upbit);