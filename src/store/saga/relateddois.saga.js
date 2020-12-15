import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as articlesAction from '../actions/articles.action'
import { DoiService } from '../../services/doi.service'

export default function* root() {
    yield all([
        takeLatest('GET_RELATED_DOIS', getRelatedDois),
        takeLatest('LOAD_METADATA_OF_DOI', loadDoiMetadata),
    ]);
}

export function* getRelatedDois(action) {
    try {
        const { data } = yield call(
            DoiService.endpoint_get_related_dois,
            action.payload,
        );

        yield put(
            articlesAction.storeRelatedDois({
                relatedDois: data,
            })
        )
    } catch (error) {
        console.log(error);
    }
}

export function* loadDoiMetadata(action) {
    try {
        const { data } = yield call(
            DoiService.endpoint_get_meta_data,
            action.payload,
        );

        yield put(
            articlesAction.storeDoiMetadata({
                metaData: data,
                citing: action.payload
            })
        )
    } catch (error) {
        console.log(error);
    }
}