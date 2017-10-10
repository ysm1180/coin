import React, { Component } from 'react';
import { CoinPrice } from '../../components';
import * as service from '../../services/myinfo';

class CoinoneContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return <CoinPrice title={this.props.title}></CoinPrice>
  }
}


export default CoinoneContainer;
