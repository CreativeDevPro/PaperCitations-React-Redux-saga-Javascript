import { all, fork } from 'redux-saga/effects';
import articlesSaga from './articles.saga';
import relatedDoisSaga from './relateddois.saga'

export default function* rootSaga() {
    yield all([
        fork(articlesSaga),
        fork(relatedDoisSaga),
    ]);
}