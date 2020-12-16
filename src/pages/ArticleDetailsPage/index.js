import {React, useEffect} from 'react';
import RelatedDoisList from './../../components/RelatedDoisList'
import RelatedDoiDetail from './../../components/RelatedDoiDetail'
import { connect } from 'react-redux';

const ArticleDetailsPage = (props) => {
  const { relatedDoiState, currentOriginalPaper } = props;
  let links = []
  let nodes = []
  relatedDoiState.map(citation => {
    links = [...links, {
      "source": currentOriginalPaper.doi,
      "target": citation.citing,
      "value" : 1
    }]
    nodes = [...nodes, {
      "id": citation.citing,
      "year": citation.year,
      "doi": citation.citing,
      "title": citation.citing,
      "authors": "",
    }]
  })

  console.log(links);
  console.log(nodes);

  return (
    <div>
      <RelatedDoisList />
      <RelatedDoiDetail />
    </div>
  )
};

const mapStateToProps=(state)=>{

  return {
    relatedDoiState: state.relatedDoiState,
    currentOriginalPaper: state.currentOriginalPaper,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    
  }
}


ArticleDetailsPage.propTypes = {};

ArticleDetailsPage.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(ArticleDetailsPage);
