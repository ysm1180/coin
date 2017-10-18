import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { AppContainer } from 'react-hot-loader';
import App from './App';

if (!window.Promise) {
  window.Promise = Promise;
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
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