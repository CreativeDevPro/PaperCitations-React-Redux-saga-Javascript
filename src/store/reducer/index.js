import { totalState }from '../states';

export default function rootReducer (state = totalState, action) {
    switch(action.type) {
        case 'STORE_ALL_ARTICLES' :
            return {...state, articlesState: action.payload.articles, onFetchingArticles: false, totalResults: action.payload.totalResults}

        case 'SET_SEARCH_ARTICLE_INPUT_VALUE' :
            return {...state, searchArticleInputValue: action.payload, onFetchingArticles: true}
        case 'SET_CURRENT_PAGE' : 
            return { ...state, currentPage: action.payload }
        case 'SET_CURRENT_OFFSET' :
            return { ...state, curOffset: action.payload }
        case 'SET_FETCHING_ARTICLES_STATUS' :
            return { ...state, onFetchingArticles: true }
        case 'STORE_RELATED_DOIS' :
            console.log('reducer!!!!!!')
            console.log(action.payload);
            let relatedDois = action.payload.map (doi => {
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
        case 'STORE_RELATED_DOIS_FOR_GRAPH' :
                return { ...state, relatedDoiForGraphState: action.payload}
        case 'STORE_SUB_RELATED_DOIS' :
            let relatedDois1 = action.payload.relatedDois.map (doi => {
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
            console.log('tested');
            console.log(relatedDois);
            let totalRelatedDois = [...state.relatedDoiState]
            totalRelatedDois = [...totalRelatedDois, ...relatedDois1]
            console.log(totalRelatedDois);
            return { ...state, relatedDoiState: totalRelatedDois, onFetchingRelatedDois: false}
        case 'SET_CURRENT_ORIGINAL_PAPER' :
            return {...state, currentOriginalPaper: action.payload}
        case 'SET_FETCHING_RELATED_DOIS_STATUS' :
            return {...state, onFetchingRelatedDois: true}
        case 'STORE_DOI_METADATA' :
            let relatedDoisData = [...state.relatedDoiState];
            let newDois = [];
            newDois = relatedDoisData.map(doi => {
                if(doi.citing === action.payload.citing) {
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
        
        case 'FAILED_FETCHING_ARTICLES':
            return {...state, currentPage: "Home", searchArticleInputValue: ''}
        case 'FAILED_FETCHING_RELATED_PAPERS':
            return {...state, currentPage: "SearchResultsPage"}
        default: 
            return state;
    }   
}