import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AxiosService = (function () {
    let AuthorizationToken = null;

    function addHeaders(userConfig) {
        const globalHeaders = {};

        if (AuthorizationToken) {
            globalHeaders['Authorization'] = `Bearer ${AuthorizationToken}`;
        }

        const { headers } = userConfig;

        return {
            headers: {
                ...globalHeaders,
                ...headers,
            },
        };
    }

    function setAuthorizationToken(token) {
        AuthorizationToken = token;
    }

    function get(endPoint, userConfig = {}) {
        return axios.get(endPoint, addHeaders(userConfig));
    }

    return {
        setAuthorizationToken,
        get,
    };
})();
