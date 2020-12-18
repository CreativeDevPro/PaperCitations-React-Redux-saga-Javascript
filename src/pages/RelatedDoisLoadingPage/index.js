import {React, useEffect} from 'react';
import { connect } from 'react-redux';
import { DoiService } from '../../services/doi.service'

const RelatedDoisLoadingPage = (props) => {

  const { currentOriginalPaper, onFetchingRelatedDois, storeRelatedDois, getRelatedDois,setCurrentPage, storeRelatedDoisForGraph, failedFetchingPapers } = props;
  
  let maindata;
  let totaldata;
  let check = 0;
  useEffect(() => {
    // getRelatedDois(currentOriginalPaper.doi);
    DoiService.endpoint_get_related_dois(currentOriginalPaper.doi).then (
      function(value) {
        maindata = value.data;
        totaldata = [...value.data];
        maindata.map(citation => {
          DoiService.endpoint_get_related_dois(citation.citing).then (
            function(value) {
              totaldata = [...totaldata, ...value.data]
              check ++;
              if(check == maindata.length) {
                storeRelatedDois(totaldata);
                storeRelatedDoisForGraph(totaldata);
              }
            },
            function(error) {
              failedFetchingPapers();
            }
            
          )
        })
      },
      function(error) {
        failedFetchingPapers();
      }
    )
    
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
    },
    storeRelatedDois: (payload) => {
      dispatch({type:'STORE_RELATED_DOIS', payload});
    },
    storeRelatedDoisForGraph: (payload) => {
      dispatch({type:'STORE_RELATED_DOIS_FOR_GRAPH', payload});
    },
    failedFetchingPapers: () => {
      dispatch({type:'FAILED_FETCHING_RELATED_PAPERS'});
    },
  }
}

RelatedDoisLoadingPage.propTypes = {
  
};

RelatedDoisLoadingPage.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoisLoadingPage);
