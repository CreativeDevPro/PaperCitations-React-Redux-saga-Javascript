import { all, fork, put } from 'redux-saga/effects';
import articlesSaga from './articles.saga';

export default function* rootSaga() {
    // console.log('saga');
    yield all([
        fork(articlesSaga),
    ]);
}