import React, { Component } from 'react';
import { MyInfoContainer, CoinoneContainer } from './containers';
import { Header } from './components';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyInfoContainer />
        <CoinoneContainer title="BCC" />
      </div>
    );
  }
}

export default App;
