import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as articlesAction from '../actions/articles.action'
import { DoiService } from '../../services/doi.service'
import { buildGetCitationsQuery } from '../../utils';

export default function* root() {
    yield all([
        takeLatest('GET_RELATED_DOIS', getRelatedDois),
        takeLatest('GET_SUB_RELATED_DOIS', getSubRelatedDois),
        takeLatest('LOAD_METADATA_OF_DOI', loadDoiMetadata),
        takeLatest('LOAD_METADATA_OF_DOI_FOR_GRAPH', loadDoiMetadataForGraph),
        takeLatest('STORE_DOIS_DATA', storeDoisData),
    ]);
}

export function* getRelatedDois(action) {
    try {
        const { data } = yield call(
            DoiService.endpoint_get_related_dois,
            action.payload,
        );
        
        let maindata = [...data];
        let totalData = [...data];
        let check = 0;

        yield all(maindata.map((citation, index) => {
            const { data } = call (DoiService.endpoint_get_related_dois, citation.citing); 
        }));
        

        let interval = setInterval ( () => {
            if( check == (maindata.length )) {   
                put(
                    articlesAction.storeRelatedDois({
                        relatedDois: totalData,
                    })
                )
        
                 put(
                    articlesAction.storeRealtedDoisForGraph({
                        relatedDois: data,
                    })
                )
            }
        }, 1000); 
        
    } catch (error) {
        alert('failed fetching papers');
        yield put(
            articlesAction.failedFetchingRelatedPapers()
        )
    }
}

export function *storeDoisData(action) {

}

export function* getSubRelatedDois(action) {
    try {
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