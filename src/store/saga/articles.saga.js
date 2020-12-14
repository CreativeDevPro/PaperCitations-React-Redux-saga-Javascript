import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ArticleService } from '../../services/article.service'
import * as articlesAction from '../actions/articles.action'

export default function* root() {
    console.log('why saga');
    yield all([
        takeLatest('GET_ALL_ARTICLES', getArticleItems),
    ]);
}

export function* getArticleItems(action) {
    console.log('saga');
    console.log('really?')
    // const data = ArticleService.endpoint_get_articles(action.input, action.extraParams)
    // console.log(data);
    try {
        const { data } = yield call(
            ArticleService.endpoint_get_articles,
            action.input,
            action.extraParams
        );
        // console.log('yahoo');
        // console.log(data);
        // let articles = data.message.items;
        // let facets = data.message.facets;
        // let totalResults = data.message["total-results"];
        // console.log('maindata')
        // console.log(articles, facets, totalResults);

        yield put(
            articlesAction.storeArticles({
                articles: data.message.items,
                totalResults: data.message["total-results"]
            })
        )
    } catch (error) {
        console.log(error);
    }
}