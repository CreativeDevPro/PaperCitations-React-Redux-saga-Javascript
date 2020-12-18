import { React, useEffect } from 'react';
import RelatedDoisList from './../../components/RelatedDoisList'
import RelatedDoiDetail from './../../components/RelatedDoiDetail'
import { connect } from 'react-redux';
import NetworkDiagram from './../../components/NetworkDiagram'
import { Typography } from '@material-ui/core';

const ArticleDetailsPage = (props) => {
  const { relatedDoiForGraphState, currentOriginalPaper } = props;
  let links = []
  let nodes = []
  relatedDoiForGraphState.map(citation => {
    if(citation.cited == currentOriginalPaper.doi)
    {
      links = [...links, {
        "source": citation.cited,
        "target": citation.citing,
        "value": 1
      }]
    }
    else {
      links = [...links, {
        "source": citation.cited,
        "target": citation.citing,
        "value": 2
      }]
    }
    
    nodes = [...nodes, {
      "id": citation.citing,
      "year": citation.creation.substr(0, 4),
      "doi": citation.citing,
      "title": citation.title,
      "authors": "",
    }]
  })
  let originalPaper = {
    "id": currentOriginalPaper.doi,
    "year": currentOriginalPaper.year,
    "doi": currentOriginalPaper.doi,
    "title": currentOriginalPaper.title,
    "authors": "",
  }
  nodes.push(originalPaper);
  
  return (
    <div>
      <Typography>
        <RelatedDoisList />
        <RelatedDoiDetail />
      </Typography>
      <Typography>
        <NetworkDiagram nodes={nodes} links={links} />
      </Typography>
    </div>
  )
};

const mapStateToProps = (state) => {

  return {
    relatedDoiForGraphState: state.relatedDoiForGraphState,
    currentOriginalPaper: state.currentOriginalPaper,
  }
}

const mapStateToDispatch = (dispatch) => {
  return {

  }
}


ArticleDetailsPage.propTypes = {};

ArticleDetailsPage.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(ArticleDetailsPage);
