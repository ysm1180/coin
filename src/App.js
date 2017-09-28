import React, { Component } from 'react';
import { MyInfoContainer } from './containers';
import { Header } from './components';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyInfoContainer />
      </div>
    );
  }
}

export default App;
