import React, { Component } from 'react';
import styles from '../../styles/MyInfoWrapper.scss';
import { Button, Icon, Statistic } from 'semantic-ui-react';

class MyInfoWrapper extends Component {
  render() {
    const {
      account,
    } = this.props;

    return (
      <div className={styles.MyInfoWrapper}>
        <Statistic size='tiny'>
          <Statistic.Value>{account} KRW</Statistic.Value>
          <Statistic.Label>UPBIT</Statistic.Label>
        </Statistic>
        <div className={styles.refresh}>
          <Button size='mini' icon='refresh'>
          </Button>
        </div>
      </div>
    );
  }
}

export default MyInfoWrapper;
