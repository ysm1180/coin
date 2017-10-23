import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import Alert from '../Alert/Alert';
import * as service from '../../services/coinone';
import styles from '../../styles/AlarmCoinPrice.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

class AlarmCoinPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alarmPrice: '0',
      alertMessage: '',
      alertVisibility: false,
    };

    this.postAlarmData = this.postAlarmData.bind(this);
    this.changeAlarmPrice = this.changeAlarmPrice.bind(this);
    this.setAlarmPriceToCurrentPrice = this.setAlarmPriceToCurrentPrice.bind(
      this
    );
    this.addAlarmPrice = this.addAlarmPrice.bind(this);
  }

  async postAlarmData() {
    try {
      const coin = this.props.coin;
      const alarmPrice = this.state.alarmPrice;
      const phone = '82' + this.props.phone.substring(1).replace('-', '');
      await service.postAlarmData(coin, alarmPrice, phone);

      this.setState({
        alertMessage: `${coin} : ${alarmPrice}원 알람이 설정되었습니다.`,
        alertVisibility: true,
      });
      setTimeout(() => {
        this.setState({
          alertVisibility: false,
        });
      }, 1500);
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
    this.setState({
      alarmPrice: this.inputPrice.value,
    });
  }

  addAlarmPrice(variation) {
    this.inputPrice.value = `${Number(this.inputPrice.value) +
      Number(variation)}`;
    this.setState({
      alarmPrice: this.inputPrice.value,
    });
  }

  render() {
    return (
      <div className={cx('AlarmCoinPrice')}>
        <Input placeholder="가격" action>
          <input
            ref={ref => (this.inputPrice = ref)}
            onChange={e => this.changeAlarmPrice(e.target.value)}
          />
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
        <Alert
          message={this.state.alertMessage}
          visible={this.state.alertVisibility}
        />
      </div>
    );
  }
}

export default AlarmCoinPrice;
