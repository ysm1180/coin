import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { MyInfoContainer, Coinone } from './containers';
import { Header } from './components';
import { withCookies, Cookies } from 'react-cookie';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    
    this.state = {
      phone: cookies.get('phone') || ''
    };
  }

  updatePhoneNumber(phone) {
    const { cookies } = this.props;

    cookies.set('phone', phone, { path: '/' });
    this.setState({
      phone
    });
  }

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

export default withCookies(App);
