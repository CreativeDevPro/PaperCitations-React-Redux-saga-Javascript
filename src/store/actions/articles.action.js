
export const getArticles = (input, extraParams) => {
    console.log('action');
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