
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