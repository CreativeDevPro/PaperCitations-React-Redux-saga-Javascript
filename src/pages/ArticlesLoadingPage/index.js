import {React, useEffect} from 'react';
import { connect } from 'react-redux';

const ArticlesLoadingPage = (props) => {

  const { searchArticleInputValue, curOffset, onFetchingArticles, getArticles, setCurrentPage } = props;
  

  useEffect(() => {
    getArticles(searchArticleInputValue, {
      itemsPerPage: 21,
      currentOffset: curOffset,
    })
  }, []);


  if(onFetchingArticles === false) {
    setCurrentPage('SearchResultsPage');
  }

  return(
  <div style={{position: "fixed", width: "100%", left: "0px", height: "100%", backgroundColor: "#ffff", display: "flex", justifyContent: "center", verticalAlign: "middle", alignItems: "center"}}>
    <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>
      <h1>Loading articles...</h1><br></br>
      <p>This normally takes a few seconds, but on rare occasions may take up to several minutes.</p>
      <b>Status: Fetching articles </b>
    </div>
  </div>
  );
};

const mapStateToProps=(state)=>{
  
  return {
    searchArticleInputValue: state.searchArticleInputValue,
    onFetchingArticles: state.onFetchingArticles,
    curOffset: state.curOffset,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    getArticles:(input, extraParams)=>{
      dispatch({type:'GET_ALL_ARTICLES',input, extraParams});
    },
    setCurrentPage: (payload) => {
      dispatch({type:'SET_CURRENT_PAGE', payload});
    }
  }
}

ArticlesLoadingPage.propTypes = {
  
};

ArticlesLoadingPage.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(ArticlesLoadingPage);
