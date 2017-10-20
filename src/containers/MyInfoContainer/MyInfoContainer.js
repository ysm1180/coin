import React, { Component } from 'react';
import { MyInfoWrapper } from '../../components';
import * as service from '../../services/coinone';

class MyInfoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coinone: {
        krw: '0',
        btc: '0.0',
        bch: '0.0',
        eth: '0.0',
        etc: '0.0',
        xrp: '0.0',
      },
      accessToken: '',
      secretKey: '',
    };
  }

  componentDidMount() {
  }

  updateToken(type, value) {
    if (type === 'accessToken') {
      this.setState({
        accessToken: value,
      });
    } else if (type === 'secretKey') {
      this.setState({
        secretKey: value,
      });
    }
  }


  applyToken(accessToken, secretKey) {
    this.setState({
      accessToken,
      secretKey,
    });
    this.fetchCoinoneMyInfo();
  }

  async fetchCoinoneMyInfo() {
    const data = await service.getBalance(
      this.state.accessToken,
      this.state.secretKey
    );
    const coinone = Object.assign({}, this.state.coinone);
    coinone.krw = data.data.krw.avail;
    coinone.btc = Math.floor(parseFloat(data.data.btc.avail) * 10000) / 10000;
    coinone.bch = Math.floor(parseFloat(data.data.bch.avail) * 10000) / 10000;
    coinone.eth = Math.floor(parseFloat(data.data.eth.avail) * 10000) / 10000;
    coinone.etc = Math.floor(parseFloat(data.data.etc.avail) * 10000) / 10000;
    coinone.xrp = Math.floor(parseFloat(data.data.xrp.avail) * 10000) / 10000;
    this.setState({
      coinone,
    });
  };

  render() {
    return (
      <MyInfoWrapper
        krw={this.state.coinone.krw}
        btc={this.state.coinone.btc}
        bch={this.state.coinone.bch}
        eth={this.state.coinone.eth}
        etc={this.state.coinone.etc}
        xrp={this.state.coinone.xrp}
        onClick={this.applyToken.bind(this)}
        onChange={this.updateToken.bind(this)}
        onPhoneChange={this.props.onPhoneChange}
        phone={this.props.phone}
      />
    );
  }
}

export default MyInfoContainer;
