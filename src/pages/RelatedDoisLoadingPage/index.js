import {React, useEffect} from 'react';
import { connect } from 'react-redux';

const RelatedDoisLoadingPage = (props) => {

  const { currentOriginalPaper, onFetchingRelatedDois, getRelatedDois,setCurrentPage } = props;
  

  useEffect(() => {
    getRelatedDois(currentOriginalPaper.doi);
  }, []);


  if(onFetchingRelatedDois === false) {
    setCurrentPage('ArticleDetailsPage');
  }

  return(
  <div style={{position: "fixed", width: "100%", left: "0px", height: "calc(100vh - 65px)", backgroundColor: "#ffff", display: "flex", justifyContent: "center", verticalAlign: "middle", alignItems: "center"}}>
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

export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoisLoadingPage);
