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

import {totalState }from '../states';

export default function rootReducer (state = totalState, action) {
    switch(action.type) {
        case 'STORE_ALL_ARTICLES' :
            console.log('here redux!')
            console.log(action.payload.articles);
            return {...state, articlesState: action.payload.articles}
    }   
}