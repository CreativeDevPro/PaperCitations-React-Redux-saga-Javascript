import React from 'react';
import PropTypes from 'prop-types';
import RelatedDoisList from './../../components/RelatedDoisList'
import RelatedDoiDetail from './../../components/RelatedDoiDetail'


const ArticleDetailsPage = () => (
  <div>
    <RelatedDoisList />
    <RelatedDoiDetail />
  </div>
);

ArticleDetailsPage.propTypes = {};

ArticleDetailsPage.defaultProps = {};

export default ArticleDetailsPage;
