import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';

// const logger=createLogger();

////////////////////////
export default function configureStore(initialState) {

    const sagaMiddleware = createSagaMiddleware();
    return {
      ...createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware)),
       runSaga: sagaMiddleware.run
     }
  }