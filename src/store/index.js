import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import {totalState }from './states';
import rootReducer from './reducer';
import rootSaga from './saga';
import {createLogger} from 'redux-logger';

const logger=createLogger();
const sagaMiddleware = createSagaMiddleware();

// const configStore = (initialState = totalState) => {
//     console.log('initial state')
//     console.log(initialState);
//     console.log('initial state');
//     const store = createStore(
//         rootReducer,
//         initialState,
//         composeWithDevTools(applyMiddleware(sagaMiddleware))
//     );

//     sagaMiddleware.run(rootSaga);

//     return store;
// };

// export const store = configStore();


////////////////////////
export default function configureStore(initialState) {
    // 注意：必须满足 redux@>=3.1.0 才可以将 middleware 作为 createStore 的最后一个参数传递
    const sagaMiddleware = createSagaMiddleware();
    return {
      ...createStore(rootReducer, initialState, applyMiddleware(logger,sagaMiddleware)),
       runSaga: sagaMiddleware.run
     }
  }