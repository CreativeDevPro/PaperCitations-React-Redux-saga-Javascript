import { AxiosService } from './axios.service'
import axios from 'axios';
import * as d3 from "d3";
import $ from "jquery";

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const DoiService = (function () {
    const endpoint_get_related_dois =  (doi) => {
        let endpoint = "https://opencitations.net/index/coci/api/v1/citations/"
        let data =  AxiosService.get(endpoint + doi);
        console.log(endpoint + doi);
        console.log('related dois!')
        // let totaldata = data;
        // console.log(data);
        // let totaldata = data;
        // console.log(totaldata);
        // console.log('abc');
        // console.log(totaldata);
        // data.map( citation => {
        //     // let tempdata = AxiosService.get(endpoint + citation.citing)
        //     // totaldata = [...totaldata, tempdata]
        //     console.log('tracked')
        //     console.log(citation);
        // })
        return data;
    };

    const endpoint_get_related_sub_dois = async (doi) => {
        let endpoint = "https://opencitations.net/index/coci/api/v1/citations/"
        AxiosService.get(endpoint + doi).then(
            function(value) {
                console.log('received but why')
                console.log(value.data);
                return value;
            },
            function(error) {
                console.log(error);
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
