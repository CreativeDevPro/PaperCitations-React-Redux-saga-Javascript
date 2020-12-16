import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ArticleService } from '../../services/article.service'
import * as articlesAction from '../actions/articles.action'

export default function* root() {
    yield all([
        takeLatest('GET_ALL_ARTICLES', getArticleItems),
    ]);
}

export function* getArticleItems(action) {
    try {
        const { data } = yield call(
            ArticleService.endpoint_get_articles,
            action.input,
            action.extraParams
        );

        yield put(
            articlesAction.storeArticles({
                articles: data.message.items,
                totalResults: data.message["total-results"]
            })
        )
    } catch (error) {
        alert('failed fetching articles');
        yield put(
            articlesAction.failedFetchingArticles()
        )
    }
}