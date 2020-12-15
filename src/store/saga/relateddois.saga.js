import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ArticleService } from '../../services/article.service'
import * as articlesAction from '../actions/articles.action'
import { DoiService } from '../../services/doi.service'

export default function* root() {
    console.log('why saga1');
    yield all([
        takeLatest('GET_RELATED_DOIS', getRelatedDois),
        takeLatest('LOAD_METADATA_OF_DOI', loadDoiMetadata),
    ]);
}

export function* getRelatedDois(action) {
    console.log('saga1111');
    console.log('really?')
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
    console.log('saga1111');
    console.log('really?')
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