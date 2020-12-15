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
        default: 
            return state;
    }   
}