import React, { Component } from 'react';
import { Coinone, Upbit } from './containers';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Upbit />
        <Coinone />
      </div>
    );
  }
}

export default App;