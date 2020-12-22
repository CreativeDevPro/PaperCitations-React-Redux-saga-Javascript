import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as articlesAction from '../actions/articles.action'
import { DoiService } from '../../services/doi.service'

export default function* root() {
    yield all([
        takeLatest('LOAD_METADATA_OF_DOI', loadDoiMetadata),
        takeLatest('LOAD_METADATA_OF_DOI_FOR_GRAPH', loadDoiMetadataForGraph),
    ]);
}



export function* loadDoiMetadataForGraph(action) {
    try {
        const { data } = yield call(
            DoiService.endpoint_get_meta_data,
            action.payload,
        );

        yield put(
            articlesAction.storeDoiMetadataForGraph({
                metaData: data,
                citing: action.payload
            })
        )
    } catch (error) {
        alert('failed loading metadata');
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
        alert('failed loading metadata');
    }
}