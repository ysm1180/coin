import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import * as service from '../../services/coinone';
import styles from '../../styles/AlarmCoinPrice.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

class AlarmCoinPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alarmPrice: '0',
    };

    this.postAlarmData = this.postAlarmData.bind(this);
    this.changeAlarmPrice = this.changeAlarmPrice.bind(this);
    this.setAlarmPriceToCurrentPrice = this.setAlarmPriceToCurrentPrice.bind(this);
    this.addAlarmPrice = this.addAlarmPrice.bind(this);
  }

  async postAlarmData() {
    try {
      const coin = this.props.coin;
      const alarmPrice = this.state.alarmPrice;
      const phone = '82' + this.props.phone.substring(1).replace('-', '');
      await service.postAlarmData(coin, alarmPrice, phone);
    } catch (err) {
      console.log(err);
    }
  }

  changeAlarmPrice(price) {
    this.setState({
      alarmPrice: price,
    });
  }

  setAlarmPriceToCurrentPrice() {
    this.inputPrice.value = this.props.price;
  }

  addAlarmPrice(variation) {
    this.inputPrice.value = `${Number(this.inputPrice.value) +
      Number(variation)}`;
  }

  render() {
    return (
      <div className={cx('AlarmCoinPrice')}>
        <Input
          placeholder="가격"
          action
          onChange={e => this.changeAlarmPrice(e.target.value)}
        >
          <input ref={ref => (this.inputPrice = ref)} />
          <Button type="submit" onClick={() => this.postAlarmData()}>
            Alarm
          </Button>
        </Input>

        <div className={cx('buttons')}>
          <Button
            size="mini"
            basic
            color="green"
            onClick={() => this.setAlarmPriceToCurrentPrice()}
          >
            현재가 설정
          </Button>
          <div className={cx('right')}>
            <Button.Group size="mini">
              <Button
                icon="chevron up"
                basic
                color="red"
                onClick={() => this.addAlarmPrice(this.props.step)}
              />
              <Button
                icon="chevron down"
                basic
                color="blue"
                onClick={() => this.addAlarmPrice(-this.props.step)}
              />
            </Button.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default AlarmCoinPrice;
