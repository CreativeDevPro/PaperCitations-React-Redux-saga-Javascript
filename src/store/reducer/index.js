// import { Reducer, combineReducers } from 'redux';
// import { articlesReducer } from './articles.reducer';

// export function createReducer(initialState, handlers) {
//     const r = (state = initialState, action) => {
//         if (handlers.hasOwnProperty(action.type)) {
//             return handlers[action.type](state, action);
//         } else {
//             return state;
//         }
//     };
//     return r;
// }

// const rootReducer = () =>
//     combineReducers({
//        articlesState: articlesReducer,
//     });

// export default rootReducer();

import { totalState }from '../states';

export default function rootReducer (state = totalState, action) {
    switch(action.type) {
        case 'STORE_ALL_ARTICLES' :
            console.log('here redux!')
            console.log(action.payload.articles);
            return {...state, articlesState: action.payload.articles, onFetchingArticles: false, totalResults: action.payload.totalResults}

        case 'SET_SEARCH_ARTICLE_INPUT_VALUE' :
            // console.log('0000000000000000000000000000');
            // console.log(action);
            console.log(action.payload);
            return {...state, searchArticleInputValue: action.payload, onFetchingArticles: true}
        case 'SET_CURRENT_PAGE' : 
            return { ...state, currentPage: action.payload }
        case 'SET_CURRENT_OFFSET' :
            return { ...state, curOffset: action.payload }
        case 'SET_FETCHING_ARTICLES_STATUS' :
            return { ...state, onFetchingArticles: true }
        case 'STORE_RELATED_DOIS' :
            let relatedDois = action.payload.relatedDois.map (doi => {
                let newDoi = {...doi, containMetaData: false }
                newDoi = {...newDoi, metaData: {
                    citation_count: '',
                    doi: '',
                    year: '',
                    source_id: '',
                    page: '',
                    reference: '',
                    author: '',
                    volume: '',
                    source_title: '',
                    issue: '',
                    oa_link: '',
                    citation: '',
                    title: '',
                }}
                return newDoi;
            })
            return { ...state, relatedDoiState: relatedDois, onFetchingRelatedDois: false}
        case 'SET_CURRENT_ORIGINAL_PAPER' :
            return {...state, currentOriginalPaper: action.payload}
        case 'SET_FETCHING_RELATED_DOIS_STATUS' :
            return {...state, onFetchingRelatedDois: true}
        case 'STORE_DOI_METADATA' :
            let relatedDoisData = [...state.relatedDoiState];
            let newDois = [];
            newDois = relatedDoisData.map(doi => {
                if(doi.citing == action.payload.citing) {
                    let temp = {...doi, containMetaData: true, metaData: action.payload.metaData[0] }
                    return temp;
                }
                else {
                    return doi;
                }
            })
            return {...state, relatedDoiState: newDois}
        case 'SET_SELECTED_DOI' :
            return {...state, selectedDoi: action.payload }
        default: 
            return state;
    }   
}