import {
    RelatedDoi,
    DoiMetadata
} from '../models';

export const emptyDoiMetaDataViewModel =() => {
    return Object.assign({
        citation_count: '',
        doi: '',
        year: '',
        source_id: '',
        page: '',
        reference: '',
        author: '',
        volume: '',
        source_title: '',
        issue: '',
        oa_link: '',
        citation: '',
        title: '',
    });
}

export const emptyRelatedDoiViewModel = () => {
    return Object.assign({
        cited: '',
        creation: '',
        oci: '',
        author_sc: '',
        citing: '',
        journal_sc: '',
        timespan: '',
        containMetaData: false,
        metaData: emptyDoiMetaDataViewModel(),
    });
};