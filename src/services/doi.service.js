import { buildArticleQuery } from '../utils'

export const DoiService = (function () {
    const endpoint_get_citations = async (doi) => {
        // $.ajax({
        //     type: "GET",
        //     url: buildGetCitationsQuery(doi),
        //     processData: false,
        //   }).then(
        //     (res) => {
        //         return res;
        //     },
        //     (err) => {
        //         return false;
        //     }
        //   );
    };

    const endpoint_get_meta_data = async (doi) => {
        // $.ajax({
        //     type: "GET",
        //     url: buildGetMetadataQuery(doi),
        //     processData: false,
        //   }).then(
        //     (res) => {
        //         return res;
        //     },
        //     (err) => {
        //         return false;
        //     }
        //   );
    }

    return {
        // endpoint_get_articles,
    };
})();
