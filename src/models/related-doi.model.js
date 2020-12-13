import { DoiMetadata } from './doi-metadata.model';

export interface RelatedDoi {
    cited: String;
    creation: String;
    oci: String;
    author_sc: String;
    citing: String;
    journal_sc: String;
    timespan: String;
    containMetaData: boolean;
    metaData: DoiMetadata;
}