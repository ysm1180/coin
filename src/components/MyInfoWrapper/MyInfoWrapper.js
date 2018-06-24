import React, { Component } from 'react';
import styles from '../../styles/MyInfoWrapper.scss';
import { Statistic } from 'semantic-ui-react';

class MyInfoWrapper extends Component {
  render() {
    const {
      currency,
      balance,
    } = this.props;

    return (
      <div className={styles.MyInfoWrapper}>
        <Statistic size='tiny'>
          <Statistic.Value>{balance} {currency}</Statistic.Value>
          <Statistic.Label>UPBIT</Statistic.Label>
        </Statistic>
      </div>
    );
  }
}

export default MyInfoWrapper;
