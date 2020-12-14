import {React, useEffect} from 'react';
import PropTypes from 'prop-types';
import { totalState } from '../../store/states';
import { connect } from 'react-redux';
import { ArticleService } from '../../services/article.service'
import { useHistory } from "react-router-dom";

const ArticlesLoadingPage = (props) => {

  const { searchArticleInputValue, curOffset, onFetchingArticles, getArticles } = props;
  const history = useHistory();
  

  useEffect(() => {
    // console.log('offset')
    // console.log(curOffset)
    getArticles(searchArticleInputValue, {
      itemsPerPage: 20,
      currentOffset: curOffset,
    })
  }, []);

  const navigateToArticlesPage = () => {
    history.push("/searchResults");
  }

  if(onFetchingArticles == false) {
    navigateToArticlesPage();
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

const mapStateToProps=(state = totalState)=>{
  
  return {
    searchArticleInputValue: state.searchArticleInputValue,
    curOffset: state.curOffset,
    onFetchingArticles: state.onFetchingArticles,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    getArticles:(input, extraParams)=>{
      dispatch({type:'GET_ALL_ARTICLES',input, extraParams});
    },
  }
}

ArticlesLoadingPage.propTypes = {
  
};

ArticlesLoadingPage.defaultProps = {};

// export default ArticlesLoadingPage;
export default connect(mapStateToProps, mapStateToDispatch)(ArticlesLoadingPage);
