import { Article } from './article.model'
import { RelatedDoi } from './related-doi.model'
import implement, { Interface, type } from 'implement-js'

export  interface IArticlesState {
    articles: Article[];
    curOffset: Number;
}

export interface IRelatedDoisState {
    relatedDois: RelatedDoi[];
    selectedDoi: RelatedDoi;
}

export interface IRootState {
    articlesState: IArticlesState;
    relatedDoiState: IRelatedDoisState;
}