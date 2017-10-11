import React, { Component } from 'react';
import { MyInfoContainer, Coinone } from './containers';
import { Header } from './components';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyInfoContainer />
        <Coinone />
      </div>
    );
  }
}

export default App;
