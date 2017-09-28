import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (!window.Promise) {
    window.Promise = Promise;
  }

const render = Component => {
    ReactDOM.render(
            <Component />
        ,
        document.getElementById('root')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => { render(App) })
}

registerServiceWorker();
