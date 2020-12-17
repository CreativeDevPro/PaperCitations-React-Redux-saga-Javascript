import { StraightenRounded } from '@material-ui/icons';
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

    async function getSubdata (endpoint, userConfig = {}) {
        let data;
        axios.get(endpoint, addHeaders(userConfig))
        .then(function(response, data) {
            data = response.data;
        })
        return data;
          
        
        // axios.get(endpoint, addHeaders(userConfig))
        // .then(function(response) {
        //     strr.push(response.data);
        // })

        // .catch(function(error){
        //     console.log(error);
        // });
        // return strr;
        // return axios.get(endpoint, addHeaders(userConfig)).then(response => response.data);
    }
    return {
        setAuthorizationToken,
        get,
        getSubdata,
    };
})();
