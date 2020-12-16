
export const getArticles = (input, extraParams) => {
    return {
        type: 'GET_ALL_ARTICLES',
        input,
        extraParams,
    };
};

export const storeArticles = (payload) => {
    return {
        type: 'STORE_ALL_ARTICLES',
        payload,
    }
}

export const setSearchArticleInputValue = (payload) => {
    return {
        type: 'SET_SEARCH_ARTICLE_INPUT_VALUE',
        payload,
    }
}

export const getRelatedDois = (payload) => {
    return {
        type: 'GET_RELATED_DOIS',
        payload,
    }
}

export const storeRelatedDois = (payload) => {
    return {
        type: 'STORE_RELATED_DOIS',
        payload,
    }
}

export const storeDoiMetadata = (payload) => {
    return {
        type: 'STORE_DOI_METADATA',
        payload
    }
}

export const failedFetchingArticles = () => {
    return {
        type: 'FAILED_FETCHING_ARTICLES',
    }
}

export const failedFetchingRelatedPapers = () => {
    return {
        type: 'FAILED_FETCHING_RELATED_PAPERS'
    }
}