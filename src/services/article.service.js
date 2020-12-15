import { buildArticleQuery} from '../utils'
import { AxiosService } from './axios.service'

export const ArticleService = (function () {
    const endpoint_get_articles = async (input, extraParams) => {
        console.log(input);
        console.log(buildArticleQuery(input, extraParams));
        let data = AxiosService.get(buildArticleQuery(input, extraParams));
        return data;
    };

    return {
        endpoint_get_articles,
    };
})();
