import { IRootState } from '../../models';
import { articlesState } from './articles.state';
import { relatedDoiState } from './related-doi.state'

const rootState: IRootState = {
    articlesState,
    relatedDoiState,
};

export default rootState;