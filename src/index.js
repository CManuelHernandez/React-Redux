import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import configureStore from './store';
import { configureClient } from './api/client';
import storage from './utils/storage';
import Root from './Root';
import './index.css';


const accessToken = storage.get('auth');
configureClient({ accessToken });

const history = createBrowserHistory();
const store = configureStore({
  preloadedState: { auth: !!accessToken },
  history,
});

ReactDOM.render(
  <React.StrictMode>
      <Root store={store} history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);
