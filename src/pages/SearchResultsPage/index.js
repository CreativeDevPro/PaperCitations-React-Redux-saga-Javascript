import React from 'react';
import { parseArticle } from '../../utils/function.util'

import List from "@material-ui/core/List";
import Article from "../../components/Article";
import Grid from "@material-ui/core/Grid/Grid";
import Pagination from "material-ui-flat-pagination";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import {totalState }from '../../store/states';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    height: "auto",
    overflow: "auto",
  },
  mainMsg: {

    paddingTop: "91px",
    paddingBottom: "41px",
  },
  subMsg: {
    fontSize: "24px",
    lineHeight: "28px",
    marginBottom: ".5rem",
  },
  searchBox: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
    borderRadius: "20px",
    width: "80%",
    maxWidth: "600px",
  },
  pagination: {
  },
}));

const SearchResultsPage = (props) => {
  const { searchArticleInputValue, articlesState, curOffset, totalResults, onFetchingArticles, getArticles, setCurOffset, setFetchingArticlesStatus } = props;
  const classes = useStyles();

  const setOffset = (e, offset) => {
    setCurOffset(offset);
    setFetchingArticlesStatus();
    getArticles(searchArticleInputValue, {
      itemsPerPage: 21,
      currentOffset: curOffset,
    })
  }
  console.log('why')
  console.log(onFetchingArticles);
  return (
    <div>
      
      <List>
        <Grid container spacing={12} style={{display:"flex"}}>
          {
            articlesState.map((article, index) => {
            let parsedArticle = parseArticle(article);
            return (
                <Grid item xs={4} xl={1} style={{height:"100%"}}>
                  <Article
                    key={`articles-${index}`}
                    article={parsedArticle} 
                    />
                </Grid>
            )
          })
       }
        </Grid>        
      </List>
      <Pagination
        className={classes.pagination}
        limit= { 21 }
        offset={curOffset}
        total={totalResults}
        shape="rounded"
        variant="outlined"
        size="large"
        onClick={ setOffset }
        style={{ textAlign: "center", marginBottom: "50px" }}
      />
      { onFetchingArticles ?
        <div style={{ position: "fixed", left: "0px", top: "0px", backgroundColor: "white", width: "100%", height: "100%", zIndex: "1000", opacity: "0.6"}}>
          <CircularProgress style={{ position: "fixed", left: "calc(50% - 35px)", top: "calc(50% - 35px)", width: "70px", height: "70px"}} /> 
        </div>
        : ""
      }
    </div>
  )
};

const mapStateToProps=(state = totalState)=>{

  return {
    searchArticleInputValue: state.searchArticleInputValue,
    articlesState: state.articlesState,
    curOffset: state.curOffset,
    totalResults: state.totalResults,
    onFetchingArticles: state.onFetchingArticles,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    getArticles:(input, extraParams)=>{
      dispatch({type:'GET_ALL_ARTICLES',input, extraParams});
    },
    setCurOffset:(payload)=>{
      dispatch({type:'SET_CURRENT_OFFSET', payload});
    },
    setFetchingArticlesStatus:()=>{
      dispatch({type:'SET_FETCHING_ARTICLES_STATUS'});
    },
  }
}

SearchResultsPage.propTypes = {};

SearchResultsPage.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(SearchResultsPage);
