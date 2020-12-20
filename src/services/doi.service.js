import { AxiosService } from './axios.service'
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const DoiService = (function () {
    const endpoint_get_related_dois =  (doi) => {
        let endpoint = "https://opencitations.net/index/coci/api/v1/citations/"
        let data =  AxiosService.get(endpoint + doi);
        return data;
    };

    const endpoint_get_related_sub_dois = async (doi) => {
        let endpoint = "https://opencitations.net/index/coci/api/v1/citations/"
        AxiosService.get(endpoint + doi).then(
            function(value) {
                return value;
            },
            function(error) {
            }
        )
    }

    const endpoint_get_meta_data = async (doi) => {
        let endpoint = "https://opencitations.net/index/coci/api/v1/metadata/"
        let data = AxiosService.get(endpoint + doi);
        return data;
    }

    return {
        endpoint_get_related_dois,
        endpoint_get_meta_data,
        endpoint_get_related_sub_dois,
    };
})();
