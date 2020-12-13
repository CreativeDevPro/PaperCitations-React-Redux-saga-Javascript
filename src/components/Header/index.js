import React from 'react';
import PropTypes from 'prop-types';
import { ArticleService } from '../../services/article.service'


const Header = () => {
  const result = ArticleService.endpoint_get_articles('artificial intellignece', {
    itemsPerPage: 20,
    currentOffset: 0,
  });
  console.log(result);
  return (
    <div>
      Header Component
    </div>
  )
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
