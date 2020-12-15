import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
