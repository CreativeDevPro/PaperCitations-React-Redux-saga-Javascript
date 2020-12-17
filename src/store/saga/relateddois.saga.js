import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as articlesAction from '../actions/articles.action'
import { DoiService } from '../../services/doi.service'
import { buildGetCitationsQuery } from '../../utils';

export default function* root() {
    yield all([
        takeLatest('GET_RELATED_DOIS', getRelatedDois),
        takeLatest('GET_SUB_RELATED_DOIS', getSubRelatedDois),
        takeLatest('LOAD_METADATA_OF_DOI', loadDoiMetadata),
    ]);
}

export function* getRelatedDois(action) {
    try {
        const { data } = yield call(
            DoiService.endpoint_get_related_dois,
            action.payload,
        );
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        
        let maindata = [...data];
        // console.log(maindata);
        // yield all(maindata.map(citation => {
           
        //    const  { data }  = call(
        //        DoiService.endpoint_get_related_dois,
        //        citation.citing,
        //     );
        //     // const { data } = DoiService.endpoint_get_related_dois(citation.citing)
        //     console.log(citation);
        //     console.log(data);
        //     // console.log(data);
            
        // }))
        
        yield put(
            articlesAction.storeRelatedDois({
                relatedDois: data,
            })
        )

        // data.map(citation => {
        //      put (
        //         articlesAction.getSubRelatedDois({
        //             payload: citation.citing
        //         })
        //     )
        // })
    } catch (error) {
        alert('failed fetching papers');
        yield put(
            articlesAction.failedFetchingRelatedPapers()
        )
    }
}

export function* getSubRelatedDois(action) {
    try {
        console.log('arrived!!!!!!!!!!');
        const { data } = yield call(
            DoiService.endpoint_get_related_dois,
            action.payload,
        );

        yield put(
            articlesAction.storeSubRelatedDois({
                relatedDois: data,
            })
        )
    } catch (error) {
        alert('failed fetching papers');
        yield put(
            articlesAction.failedFetchingRelatedPapers()
        )
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