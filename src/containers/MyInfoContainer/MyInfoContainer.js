import React, { Component } from 'react';
import { MyInfoWrapper } from '../../components';
import * as UpbitService from '../../services/upbit';

class MyInfoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: 0,
    };
  }

  componentDidMount() {
    this.loadAccount();
  }

  async loadAccount() {
    const data = await UpbitService.getAccounts();
    const accounts = Math.floor(data.data[0].balance);

    this.setState({
      accounts
    });
  }

  render() {
    return (
      <MyInfoWrapper
        account={this.state.accounts}
      />
    );
  }
}

export default MyInfoContainer;
