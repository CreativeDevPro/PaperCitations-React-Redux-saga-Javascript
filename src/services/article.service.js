import { buildArticleQuery,  buildGetCitationsQuery, buildGetMetadataQuery} from '../utils'
import { AxiosService } from './axios.service'

export const ArticleService = (function () {
    const endpoint_get_articles = async (input, extraParams) => {
        return AxiosService.get(buildArticleQuery(input, extraParams));
    };

    return {
        endpoint_get_articles,
    };
})();
