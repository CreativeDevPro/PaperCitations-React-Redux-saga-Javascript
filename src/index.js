import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pages from './pages';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateStore from './store';
import rootSaga from './store/saga';

const store=CreateStore();
store.runSaga(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Pages />
    </Router>
  </Provider>,
  document.getElementById('root')
);

