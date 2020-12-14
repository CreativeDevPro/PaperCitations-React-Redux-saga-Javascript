
export const getArticles = (input, extraParams) => {
    console.log('5555555555555555555')
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
    console.log('1111111111111111')
    console.log(payload)
    return {
        type: 'SET_SEARCH_ARTICLE_INPUT_VALUE',
        payload,
    }
}