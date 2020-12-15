import {React, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "85%",
    overflow: "auto",
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
}));


const Home = (props) => {
  const classes = useStyles();
  const { setSearchArticleInputValue, setCurrentPage } = props;
  const [inputValue, setInputValue] = useState('')
  const handleKeyUp = (e) => {
    if(e.nativeEvent.keyCode === 13) {
      if(inputValue !== '') {
        console.log(inputValue);
        setSearchArticleInputValue(inputValue);
        setCurrentPage('ArticlesLoading');
      }
    }
  };
  
  return(
    <div style={{ textAlign: 'center' }}>
        <Typography
          className={classes.mainMsg}
          variant="h4"
          color="textSecondary"
        >Explore connected papers in a visual graph</Typography>
        <Typography
          className={classes.subMsg}
          variant="h5"
          color="textSecondary"
        >To start, enter a paper identifier</Typography>
        <div style={{ marginTop: "30px" }}>
          <Toolbar>
            <TextField
              className={classes.search, classes.searchBox}
              onKeyUp={handleKeyUp}
              label="Search field"
              placeholder='For example "DARTS: Differentiable Architecture Search"'
              variant="outlined"
              value={inputValue} 
			        onChange={(e) => setInputValue(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              
            />
          </Toolbar>
        </div>
      </div>

  );
};

const mapStateToProps=(state)=>{

  return {
    isLoading: state.isLoading,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    getArticles:(input, extraParams)=>{
      dispatch({type:'GET_ALL_ARTICLES',input, extraParams});
    },
    setSearchArticleInputValue: (payload) => {
      dispatch({type:'SET_SEARCH_ARTICLE_INPUT_VALUE', payload});
    },
    setCurrentPage: (payload) => {
      dispatch({type:'SET_CURRENT_PAGE', payload});
    }
  }
}

Home.propTypes = {
  
};

Home.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(Home);
