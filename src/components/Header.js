import {React , useState} from 'react';
import { connect } from 'react-redux';
import {totalState }from '../store/states';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import RelatedDoiFetchSetting from './RelatedDoiFetchSetting'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(56,142,60, 0.9)'
  },
  header: {
    backgroundColor: "transparent",
    // color: "black",
    // boxShadow: "0px 0px 0px 0px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: "white"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  margin: {
    margin: theme.spacing(0.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

const Header = (props) => {
  const { searchArticleInputValue, setSearchArticleInputValue, setCurrentPage } = props;
  const [inputValue, setInputValue] = useState('')
  const [isSettingOpened, setIsSettingOpened] = useState(false);

  const classes = useStyles();
  const handleKeyUp = (e) => {
    if(e.nativeEvent.keyCode === 13) {
      if(inputValue !== '') {
        setSearchArticleInputValue(inputValue);
        // history.push("/articles/loading");
        setCurrentPage('ArticlesLoading');
      }
    }
  };

  const goHome = () => {
    setSearchArticleInputValue('');
    setCurrentPage('Home');
  }
  const showHelp = () => {
    setCurrentPage('Help');
  }

  const showSetting =() => {
    setIsSettingOpened(!isSettingOpened);
  }
  
  return (
    <div className={classes.root} >
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <img src="logo.png" alt="logo"></img>
            Science Garden
          </Typography>
          {searchArticleInputValue !== '' ?
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon id="searchIcon" />
              </div>
              <InputBase
                placeholder='Search Articles'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={handleKeyUp}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div> :
            ""
          }
          <IconButton aria-label="delete" onClick={ goHome } style={{marginLeft: "30px"}} className={classes.margin} size="small">
            <HomeOutlinedIcon style={{color: "white", fontSize: "30px"}}/>
          </IconButton>
          <IconButton aria-label="delete"  style={{marginLeft: "30px"}} className={classes.margin} size="small" style={{position: "relative"}}>
            <SettingsIcon onClick={ showSetting } style={{color: "white", fontSize: "30px"}}/>
            {
              isSettingOpened ? 
                <div style={{position: "absolute", top: "43px", width: "200px", right: "-34px", zIndex: "10000"}}>
                  <RelatedDoiFetchSetting></RelatedDoiFetchSetting>
                </div>
              : ""
            }
            
          </IconButton>
          <IconButton aria-label="delete" onClick={ showHelp } style={{marginRight: "-10px"}} className={classes.margin} size="small">
            <HelpOutlineIcon style={{color: "white", fontSize: "30px"}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
};

const mapStateToProps=(state = totalState)=>{

  return {
    searchArticleInputValue: state.searchArticleInputValue,
    onFetchingArticles: state.onFetchingArticles,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    setSearchArticleInputValue: (payload) => {
      dispatch({type:'SET_SEARCH_ARTICLE_INPUT_VALUE', payload});
    },
    setCurrentPage: (payload) => {
      dispatch({type:'SET_CURRENT_PAGE', payload});
    }
  }
}
Header.propTypes = {};

Header.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(Header);
