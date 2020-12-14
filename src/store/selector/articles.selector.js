import { createSelector } from 'reselect';
import { IArticlesState } from '../../models';

export const selectArticlesState = (rootState) => {
    return rootState.articlesState;
};