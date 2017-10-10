import React from 'react';
import styles from '../../styles/MyInfoWrapper.scss';
import { Input, Button, Form, Statistic } from 'semantic-ui-react';

const MyInfoWrapper = ({ krw, btc, etc, eth, bch, xrp, onChange, onClick }) => {
  const items = [
    {
      label: 'KRW',
      value: krw
    },
    {
      label: 'BTC',
      value: btc
    },
    {
      label: 'BCH',
      value: bch
    },
    {
      label: 'ETH',
      value: eth
    },
    {
      label: 'ETC',
      value: etc
    },
    {
      label: 'XRP',
      value: xrp
    }
  ];

  return (
    <div className={styles.MyInfoWrapper}>
      <Form>
        <Form.Field>
          <Input
            label="COINONE ACCESS TOKEN"
            onChange={e => onChange('accessToken', e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label="COINONE SECRET KEY"
            onChange={e => onChange('secretKey', e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button color="teal" onClick={() => onClick()}>
            COINONE 잔액
          </Button>
        </Form.Field>
      </Form>
      <div className={styles.bugget}>
        <Statistic.Group items={items} size="mini" />
      </div>
    </div>
  );
};

export default MyInfoWrapper;
