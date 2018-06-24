import React, { Component } from 'react';
import { MyInfoWrapper } from '../../components';
import styles from '../../styles/MyInfoContainer.scss';
import { Button } from 'semantic-ui-react';
import * as UpbitService from '../../services/upbit';

class MyInfoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: [],
    };
  }

  componentDidMount() {
    this.loadAccount();
  }

  async loadAccount() {
    const data = await UpbitService.getAccounts();
    const balance = data.data;

    this.setState({
      balance
    });
  }

  render() {
    return (
      <div className={styles.MyInfoContainer}>
        {this.state.balance.map((data) => {
          return (
            <MyInfoWrapper
              key={data.currency}
              currency={data.currency}
              balance={data.balance}
            />
          )
        })}
        <div className={styles.refreshButton}>
          <Button size='mini' icon='refresh' onClick={() => { this.loadAccount(); }} />
        </div>
      </div>
    );
  }
}

export default MyInfoContainer;
