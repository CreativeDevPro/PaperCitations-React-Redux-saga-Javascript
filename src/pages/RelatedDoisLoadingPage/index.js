import {React, useEffect} from 'react';
import PropTypes from 'prop-types';
import { totalState } from '../../store/states';
import { connect } from 'react-redux';
import { ArticleService } from '../../services/article.service'
import { useHistory } from "react-router-dom";

const RelatedDoisLoadingPage = (props) => {

  const { currentOriginalPaper, onFetchingRelatedDois, getRelatedDois,setCurrentPage } = props;
  

  useEffect(() => {
    // console.log('offset')
    // console.log(curOffset)
    getRelatedDois(currentOriginalPaper.doi);
  }, []);


  if(onFetchingRelatedDois == false) {
    setCurrentPage('ArticleDetailsPage');
  }

  return(
  <div style={{position: "fixed", width: "100%", left: "0px", height: "100%", backgroundColor: "#ffff", display: "flex", justifyContent: "center", verticalAlign: "middle", alignItems: "center"}}>
    <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>
      <h1>Loading graph...</h1><br></br>
      <p>This normally takes a few seconds, but on rare occasions may take up to several minutes.</p>
      <b>Status: Fetching paper </b>
    </div>
  </div>
  );
};

const mapStateToProps=(state)=>{
  
  return {
    currentOriginalPaper: state.currentOriginalPaper,
    onFetchingRelatedDois: state.onFetchingRelatedDois
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    getRelatedDois: (payload)=>{
      dispatch({type:'GET_RELATED_DOIS',payload});
    },
    setCurrentPage: (payload) => {
      dispatch({type:'SET_CURRENT_PAGE', payload});
    }
  }
}

RelatedDoisLoadingPage.propTypes = {
  
};

RelatedDoisLoadingPage.defaultProps = {};

// export default ArticlesLoadingPage;
export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoisLoadingPage);
