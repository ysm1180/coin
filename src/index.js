import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { CookiesProvider } from 'react-cookie';

if (!window.Promise) {
  window.Promise = Promise;
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <CookiesProvider>
        <Component />
      </CookiesProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
