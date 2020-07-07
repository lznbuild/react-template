import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import store from 'store/index';
import App from './app';

ReactDom.render(
  <AppContainer>
    <Provider {...store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);
