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
        xrp: '0.0'
      },
      accessToken: '',
      secretKey: ''
    };
  }

  componentDidMount() {
  }

  updateToken = (type, value) => {
    if (type === 'accessToken') {
      this.setState({
        accessToken: value
      });
    } else if (type === 'secretKey') {
      this.setState({
        secretKey: value
      });
    }
  };

  applyToken = (accessToken, secretKey) => {
    this.setState({
      accessToken,
      secretKey
    });
    this.fetchCoinoneMyInfo();
  };

  fetchCoinoneMyInfo = async () => {
    const data = await service.getBalance(
      this.state.accessToken,
      this.state.secretKey
    );
    const coinone = Object.assign({}, this.state.coinone);
    coinone.krw = data.data.krw.avail;
    coinone.btc = data.data.btc.avail;
    coinone.bch = data.data.bch.avail;
    coinone.eth = data.data.eth.avail;
    coinone.etc = data.data.etc.avail;
    coinone.xrp = data.data.xrp.avail;
    this.setState({
      coinone
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
        onClick={this.applyToken}
        onChange={this.updateToken}
      />
    );
  }
}

export default MyInfoContainer;
