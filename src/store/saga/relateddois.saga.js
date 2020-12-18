import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as articlesAction from '../actions/articles.action'
import { DoiService } from '../../services/doi.service'
import { buildGetCitationsQuery } from '../../utils';

export default function* root() {
    yield all([
        takeLatest('GET_RELATED_DOIS', getRelatedDois),
        takeLatest('GET_SUB_RELATED_DOIS', getSubRelatedDois),
        takeLatest('LOAD_METADATA_OF_DOI', loadDoiMetadata),
        takeLatest('STORE_DOIS_DATA', storeDoisData),
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
        let totalData = [...data];
        let check = 0;
        // console.log(maindata);

        yield all(maindata.map((citation, index) => {
           
        //    const  { data }  = call(
        //        DoiService.endpoint_get_related_dois,
        //        citation.citing,
        //     );
            // DoiService.endpoint_get_related_dois(citation.citing).then(
            //      function(value) { 
            //         check ++;
            //         console.log('why?????')
            //         console.log(check);
            //         console.log(value.data);  
            //         totalData = [...totalData, ...value.data]
                
            //         console.log('totaldata')
            //         console.log(totalData);

            //         if(check == (maindata.length )) {
            //             console.log('totaldatasuccesss')
            //             console.log(totalData);
                    
                        
            //         }
                    
            //     },
            //     function(error) { console.log(error) }
            // )
            const { data } = call (DoiService.endpoint_get_related_dois, citation.citing);
            console.log('disappointed');
            console.log(data);
            
            // console.log(citation);
            // console.log(data);
            // if( index == (maindata.length - 1) ) {
            //     console.log('success');
            //      put(
            //         articlesAction.storeRelatedDois({
            //             relatedDois: totalData,
            //         })
            //     )
        
            //      put(
            //         articlesAction.storeRealtedDoisForGraph({
            //             relatedDois: data,
            //         })
            //     )
            // }
            
        }));
        
        // yield put(
        //     articlesAction.storeRelatedDois({
        //         relatedDois: totalData,
        //     })
        // )
        // console.log('totalData');
        // console.log(totalData);
        

        // data.map(citation => {
        //      put (
        //         articlesAction.getSubRelatedDois({
        //             payload: citation.citing
        //         })
        //     )
        // })
        let interval = setInterval ( () => {
            if( check == (maindata.length )) {
                console.log('hurrayyyyyyyyyyyyyyy');
                
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

// function doAction() {
//      yield put(
//             articlesAction.storeRelatedDois({
//                 relatedDois: totalData,
//             })
//         )

//          yield put(
//             articlesAction.storeRealtedDoisForGraph({
//                 relatedDois: data,
//             })
//         )
    
// }

export function *storeDoisData(action) {

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