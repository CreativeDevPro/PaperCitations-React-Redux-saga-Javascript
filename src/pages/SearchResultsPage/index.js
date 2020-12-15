import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Pagination from '@material-ui/lab/Pagination';
import { parseArticle } from '../../utils/function.util'

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Article from "../../components/Article";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Pagination from "material-ui-flat-pagination";
import Toolbar from "@material-ui/core/Toolbar";
import Input from "@material-ui/core/Input";
import TextField from '@material-ui/core/TextField';
import { useRadioGroup } from "@material-ui/core";
import { connect } from 'react-redux';
// import { fade, makeStyles } from '@material-ui/core/styles';
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
    // margin: theme.spacing.unit,
  },
}));

const SearchResultsPage = (props) => {
  const { searchArticleInputValue, articlesState, curOffset, totalResults, onFetchingArticles, getArticles, setCurOffset, setFetchingArticlesStatus } = props;
  const classes = useStyles();
  // let listItems = articlesState.map((article, index) => {
  //   let parsedArticle = parseArticle(article);
  //   return (
  //       <Grid key={`item-${index}`} item xs={4} xl={1} style={{height:"100%"}}>
  //         <Article
  //           key={`articles-${index}`}
  //           article={parsedArticle}
  //           // articles={this.props.articles}
  //           // totalResults={this.props.totalResults}
  //           // queryInput={this.props.lastQuerySettings.input} />
  //           />
  //       </Grid>
  //   )
  // });
  const setOffset = (e, offset) => {
    setCurOffset(offset);
    setFetchingArticlesStatus();
    getArticles(searchArticleInputValue, {
      itemsPerPage: 21,
      currentOffset: curOffset,
    })
    // console.log('yahoo');
  }
  console.log('why')
  console.log(onFetchingArticles);
  return (
    <div>
      {/* { onFetchingArticles ? 
        <CircularProgress style={{ position: "absolute", left: "calc(50% - 35px)", top: "calc(50% - 35px)", width: "70px", height: "70px"}} /> :
        "" 
      } */}
      
      <List>
        <Grid container spacing={12} style={{display:"flex"}}>
          {/* {listItems} */}
          {
            articlesState.map((article, index) => {
            let parsedArticle = parseArticle(article);
            return (
                <Grid item xs={4} xl={1} style={{height:"100%"}}>
                  <Article
                    key={`articles-${index}`}
                    article={parsedArticle} 
                    // articles={this.props.articles}
                    // totalResults={this.props.totalResults}
                    // queryInput={this.props.lastQuerySettings.input} />
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
        // showFirstButton
        // showLastButton
        style={{ textAlign: "center", marginBottom: "50px" }}
      />
      { onFetchingArticles ?
        <CircularProgress style={{ position: "fixed", left: "calc(50% - 35px)", top: "calc(50% - 35px)", width: "70px", height: "70px"}} /> 
        : ""
      }
    </div>
  )
};

const mapStateToProps=(state = totalState)=>{

  return {
    // isLoading: state.isLoading,
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

// export default SearchResultsPage;
export default connect(mapStateToProps, mapStateToDispatch)(SearchResultsPage);
