// import { IRootState } from '../../models';
// import { articlesState } from './articles.state';
// import { relatedDoiState } from './related-doi.state'

// const rootState = {
//     articlesState,
//     relatedDoiState,
// };

export const totalState = {
    articlesState: [],
    relatedDoiState: [],
    selectedDoi : {
        cited: '',
        creation: '',
        oci: '',
        author_sc: '',
        citing: '',
        journal_sc: '',
        timespan: '',
        containMetaData: false,
        metaData: {
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
            journal: '',
        }
    },
    curOffset: 0,
    isLoading: false,
    searchArticleInputValue: "",
    onFetchingArticles: true,
    onFetchingRelatedDois: true,
    totalResults: 0,
    currentPage: "Home",
    currentOriginalPaper: {},
}

// export default rootState;