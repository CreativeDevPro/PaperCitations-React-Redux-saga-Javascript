import { IRelatedDoisState } from '../../models';
import { emptyRelatedDoiViewModel } from '../../utils';

export const relatedDoiState: IRelatedDoisState = {
    relatedDois: [],
    selectedDoi: emptyRelatedDoiViewModel(),
}