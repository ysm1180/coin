import React, { Component } from 'react';
import styles from '../../styles/MyInfoWrapper.scss';
import { Form, Statistic } from 'semantic-ui-react';

class MyInfoWrapper extends Component {
  render() {
    const {
      account,
    } = this.props;

    return (
      <div className={styles.MyInfoWrapper}>
        <Form>
          <Statistic size='tiny'>
            <Statistic.Value>{account} KRW</Statistic.Value>
            <Statistic.Label>UPBIT</Statistic.Label>
          </Statistic>
        </Form>
      </div>
    );
  }
}

export default MyInfoWrapper;
