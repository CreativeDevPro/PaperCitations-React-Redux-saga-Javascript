import { React, useEffect} from 'react';
import { connect } from 'react-redux';
import { DoiService } from '../../services/doi.service'

const RelatedDoisLoadingPage = (props) => {

  const { currentOriginalPaper, maxLayers, maxNodes, onFetchingRelatedDois, storeRelatedDois,setCurrentPage, failedFetchingPapers } = props;
  
  let uniqueDOIs = {};
  let uniqueDOICount = 0;

  let DOIsToLoad = [];
  let todoCount = 0;
  let doneCount = 0;

  // let maxLayers = 2;
  // let maxNodes = 1000;
  let currentLayers = -1;
  let totalCitations = [];

  /**
   * Load citations for specified DOI, via opencitations.net API
   * @param {String} doi
   * @return void
   */
  function loadCitations(doi) {
    DoiService.endpoint_get_related_dois(doi).then(
      function(value) {
        totalCitations = [...totalCitations, ...value.data];
        value.data.map(citation => {
          if (!(citation.citing in uniqueDOIs)) {
            DOIsToLoad.push(citation.citing);
            uniqueDOIs[citation.citing] = 1;
            uniqueDOICount ++;
          }
          return 1;
        })

        // check whether done or not
        doneCount ++;
        startToLoadForNewLayer();
      },
      function(error) {
        failedFetchingPapers();
      }
    )
  }

  function startToLoadForNewLayer() {
    if (todoCount > doneCount) {
      return;
    }

    currentLayers ++;

    // the number of layers reached to limit
    if (currentLayers === maxLayers
       || DOIsToLoad.length === 0
       || uniqueDOICount >= maxNodes
    ) {
      //remove duplicated citations
      let filteredCitations = [];
      totalCitations.map(citation => {
        let duplicatedCheck = 0;
        filteredCitations.map(filteredcitation => {
          if(filteredcitation.citing === citation.citing) {
            duplicatedCheck = 1;
          }
          return 1;
        })
        if(duplicatedCheck === 0) {
          filteredCitations = [...filteredCitations, citation]
        }
        return 1;
      })

      //save loaded citations to redux
      storeRelatedDois(filteredCitations);
      return;
    }

    // start to load citations for leaf-papers(DOIs)
    let loadQueue = [...DOIsToLoad];
    todoCount = DOIsToLoad.length;
    doneCount = 0;
    DOIsToLoad = [];
    for (let childDOI of loadQueue) {
      loadCitations(childDOI);
    }
  }

  // start to load citations
  useEffect(() => {
    DOIsToLoad = [currentOriginalPaper.doi];
    startToLoadForNewLayer();
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
    onFetchingRelatedDois: state.onFetchingRelatedDois,
    maxLayers: state.maxLayers,
    maxNodes: state.maxNodes,
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
    failedFetchingPapers: () => {
      dispatch({type:'FAILED_FETCHING_RELATED_PAPERS'});
    },
  }
}

RelatedDoisLoadingPage.propTypes = {};

RelatedDoisLoadingPage.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoisLoadingPage);
