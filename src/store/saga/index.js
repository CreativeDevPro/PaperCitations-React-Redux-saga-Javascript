import { all, fork, put } from 'redux-saga/effects';
import articlesSaga from './articles.saga';
import relatedDoisSaga from './relateddois.saga'

export default function* rootSaga() {
    // console.log('saga');
    yield all([
        fork(articlesSaga),
        fork(relatedDoisSaga),
    ]);
}