import { React } from 'react';
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
    links = [...links, {
      "source": citation.cited,
      "target": citation.citing,
      "value": 1
    }]

    if (nodes.filter(node => node.doi === citation.citing).length === 0) {
      let nodeLevel = 0;
      if (citation.cited === currentOriginalPaper.doi) {
        nodeLevel = 1;
      } else {
        nodeLevel = 2;
      }

      nodes = [...nodes, {
        "id": citation.citing,
        "year": citation.creation.substr(0, 4),
        "doi": citation.citing,
        "title": citation.title,
        "authors": "",
        "nodeLevel": nodeLevel
      }]
    }
    return 1;
  })
  let originalPaper = {
    "id": currentOriginalPaper.doi,
    "year": currentOriginalPaper.year,
    "doi": currentOriginalPaper.doi,
    "title": currentOriginalPaper.title,
    "authors": "",
    "nodeLevel": 0
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
