import React, { Component } from 'react';
import styles from '../../styles/SimpleCoinPrice.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

class SimpleCoinPrice extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { currency, market, name, change, price, lastPrice, onClick, selected } = this.props;

        return (
            <div className={cx('SimpleCoinPrice', selected ? 'selected' : '')} onClick={() => {
                onClick(currency, market);
            }}>
                <div className={styles.item}>
                    <span className={styles.name}>
                        {name}
                    </span>
                    <span className={cx('price', change === 'FALL' ? 'blue' : change === 'EVEN' ? 'grey' : 'red')}>
                        {price}
                    </span>
                    <span className={cx('percent', price / lastPrice < 1 ? 'blue' : price === lastPrice ? 'grey' : 'red')}>
                        {Math.floor((Number(price) / Number(lastPrice) - 1) * 10000) / 100}%
            </span>
                </div>
            </div>
        );
    }
}

export default SimpleCoinPrice;