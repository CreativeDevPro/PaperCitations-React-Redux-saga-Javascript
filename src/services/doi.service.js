import { AxiosService } from './axios.service'

export const DoiService = (function () {
    const endpoint_get_related_dois = async (doi) => {
        let endpoint = "https://opencitations.net/index/coci/api/v1/citations/"
        let data = AxiosService.get(endpoint + doi);
        console.log(endpoint + doi);
        console.log('related dois!')
        console.log(data);
        return data;
    };

    const endpoint_get_meta_data = async (doi) => {
        let endpoint = "https://opencitations.net/index/coci/api/v1/metadata/"
        let data = AxiosService.get(endpoint + doi);
        return data;
    }

    return {
        endpoint_get_related_dois,
        endpoint_get_meta_data
    };
})();
