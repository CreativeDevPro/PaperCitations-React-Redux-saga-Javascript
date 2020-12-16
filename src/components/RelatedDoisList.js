import {React, useState} from 'react';
import { connect } from 'react-redux';
import {totalState }from '../store/states';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import { FilterNone } from '@material-ui/icons';

const drawerWidth = "calc(20%)";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    position: "absolute",
    top: "64px",
    height: "calc(100% - 65px)",
    boxShadow: "-3px 3px 20px"
  },
  drawerHeader: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  card: {
    margin: "5px 10px",
    padding: "unset",
  },
}));

const RelatedDoisList = (props) => {
  const {relatedDoiState, currentOriginalPaper, setCurrentPage, loadMetaDataInfo, setSelectedDoi} = props;

  const [open, setOpen] = useState(true);
  const [focusedId, setFocusedId] = useState(-1);
  const [selectedId, setSelectedId] = useState(0);
  const [loadingMetaDoiId, setLoadingMetaDoiId] = useState(-1);
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadMetaData = (id, cited) => (event) => {
    setLoadingMetaDoiId(id);
    loadMetaDataInfo(cited);
  }

  const focusDoi = (index, doi, isFocusChange) => {
    console.log('focused');
    setSelectedDoi(doi);


    if(isFocusChange === true)
      setFocusedId(index + 1);
    else 
      setFocusedId(selectedId);
  }

  const selectItem = (id) => (event) => {
    setSelectedId(id);
  }

  const backToSearchResult = () => {
    setCurrentPage('SearchResultsPage');
  }

  const handleMouseOutOfList = () => {
    console.log('out');
    if(selectedId === 0) {
      focusOriginalPaper(false);
    }
    else if(selectedId > 0){
      focusDoi(selectedId - 1, relatedDoiState[selectedId-1], false)
    }
  }

  const handleMouseOutofWidget = () => {
    alert('abc');
  }

  const focusOriginalPaper = (isFocusChange) => {
    let selectedDoi =  {
      cited: 'original',
      creation: '',
      oci: '',
      author_sc: '',
      citing: '',
      journal_sc: '',
      timespan: '',
      containMetaData: false,
      metaData: {
          citation_count: '',
          doi: '',
          year: '',
          source_id: '',
          page: '',
          reference: '',
          author: '',
          volume: '',
          source_title: '',
          issue: '',
          oa_link: '',
          citation: '',
          title: '',
          journal: '',
      }
    }
    let metaData = {...selectedDoi.metaData}
    metaData = {...metaData, 
                  title: currentOriginalPaper.title, 
                  doi: currentOriginalPaper.doi,
                  year: currentOriginalPaper.year,
                  author: currentOriginalPaper.author,

                }
    selectedDoi = {...selectedDoi, metaData: metaData, containMetaData: true }
    setSelectedDoi(selectedDoi);
    if(isFocusChange === true)
      setFocusedId(0);
    else 
      setFocusedId(selectedId);
  }
  return (
    <div>

        { open ?
            <div className={classes.root} >
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                  <Button onClick= { backToSearchResult } style={{ fontSize: "12px", marginTop: "6px"}} color="primary">{`<< Back`}</Button>
                  <IconButton onClick={handleDrawerClose} style={{ height: "50px", marginTop: "auto", marginBottom: "auto"}}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                <Divider />
       
                <List style={{ overflowY: "auto"}} onMouseLeave={() => { handleMouseOutOfList() }}>
                  <ListItem button key="original" style={{ paddingLeft: "0px", paddingRight: "0px", borderBottom: "1px solid lightgray", backgroundColor: ( selectedId === 0 ? "rgb(232, 232, 232)" : "") }}
                    // onMouseOut={() => { handleMouseOutOfList() }}
                    onMouseEnter={() => { focusOriginalPaper(true) }}
            
                    onClick={selectItem(0)}
                  >
                      <Card raised
                        style={{  height: "auto", width: "100%" , paddingBottom: "5px", boxShadow: "none", cursor: "pointer", background: "transparent"}}>
                        <CardContent className={classes.card} >
                            <Typography gutterBottom variant="h6" component="h6" style={{ overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: "2", display: "-webkit-box", WebkitBoxOrient: "vertical" , lineHeight: "1.1em", fontSize: "18px" }}>
                            { currentOriginalPaper.title}
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                component="p"
                                color="textSecondary"
                                style={{ overflow: "hidden", textOverflow: "ellipsis", fontSize: "13px", height: "22px", WebkitLineClamp: "1" ,display: "-webkit-box", WebkitBoxOrient: "vertical"}}
                            >
                                { currentOriginalPaper.authors }           
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="subheading"
                                component="div"
                                style={{ lineHeight: "1.8", fontSize: "13px", marginTop: "-3px"}}
                            >
                             { currentOriginalPaper.year }
                            </Typography>
                            </div>
                            
                        </CardContent>
                        {
                          (focusedId === 0 || selectedId === 0)?
                          <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Link href={`http://dx.doi.org/${currentOriginalPaper.doi}`} variant="h6" color="inherit" target="_blank" rel="opener" style={{marginTop: "-3px"}}>
                              <Button variant="outlined" style={{ width: "110px", height: "28px", fontSize: "9px"}}>Open Link</Button>
                            </Link>
                              <div style={{ color: "blue", textAlign: "center", fontSize: "12px", width: "110px", marginTop: "4px" }}>
                                Original Paper
                              </div>
                          </div> : 
                          ""
                        }
                    </Card>
                    <Divider />
                  </ListItem>
                  {relatedDoiState.map((doi, index) => (
                    <ListItem button key={doi.citing} style={{ paddingLeft: "0px", paddingRight: "0px", borderBottom: "1px solid lightgray", backgroundColor: ( selectedId === index + 1 ? "rgb(232, 232, 232)" : "")}} 
                    // onMouseLe={() => { handleMouseOutOfList() }}
                    onMouseEnter={() => { focusDoi(index, doi, true) }}
                    onClick={selectItem(index + 1)}
                    >
                      <Card raised
                        style={{  height: "auto", width: "100%" , paddingBottom: "5px", boxShadow: "none", cursor: "pointer", background: "transparent"}}>
                        <CardContent className={classes.card} >
                            <Typography gutterBottom variant="h6" component="h6" style={{ overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: "2", display: "-webkit-box", WebkitBoxOrient: "vertical" , lineHeight: "1.1em", fontSize: "18px" }}>
                            { doi.containMetaData ? doi.metaData.source_title : doi.citing }
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                component="p"
                                color="textSecondary"
                                style={{ overflow: "hidden", textOverflow: "ellipsis", fontSize: "13px", height: "22px", WebkitLineClamp: "1" ,display: "-webkit-box", WebkitBoxOrient: "vertical"}}
                            >
                                {doi.containMetaData ? doi.metaData.doi : doi.author}           
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="subheading"
                                component="div"
                                style={{ lineHeight: "1.8", fontSize: "13px", marginTop: "-3px"}}
                            >
                              { doi.containMetaData ? doi.metaData.year : doi.creation}
                            </Typography>
                            </div>
                            
                        </CardContent>
                        { ((index + 1) === focusedId || selectedId === index + 1) ?
                          <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Link href={`http://dx.doi.org/${doi.citing}`} variant="h6" color="inherit" target="_blank" rel="opener" style={{marginTop: "-3px"}}>
                              <Button variant="outlined" style={{ width: "110px", height: "28px", fontSize: "9px"}}>Open Link</Button>
                            </Link>
                              { doi.containMetaData ?  
                                  <Button variant="outlined" disabled="true" style={{ width: "110px", height: "28px", fontSize: "9px"}}>Load Metadata</Button> 
                                :
                                <Button variant="outlined" onClick={loadMetaData(index, doi.citing)} style={{ width: "110px", height: "28px", fontSize: "9px"}}>
                                  {
                                    (loadingMetaDoiId === index) ? 
                                    <CircularProgress style={{ width: "18px", height: "18px"}} /> :
                                    "Load Metadata"
                                  }
    
                                  
                                </Button>
                              }
                          </div> :
                          ""
                        }
                    </Card>
                    <Divider />
                  </ListItem>
                    // <div>sdfdsaf</div>
                ))}
                </List>
            </Drawer>
            </div>
        :
        <IconButton onClick={handleDrawerOpen} style={{ position: "absolute" }}>
            {theme.direction === 'rtr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    }
    </div>
  )
};

const mapStateToProps=(state = totalState)=>{

  return {
    relatedDoiState: state.relatedDoiState,
    currentOriginalPaper: state.currentOriginalPaper,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
   setCurrentPage: (payload) => {
      dispatch({type:'SET_CURRENT_PAGE', payload});
    },
    loadMetaDataInfo: (payload) => {
      dispatch({type:'LOAD_METADATA_OF_DOI', payload});
    },
    setSelectedDoi: (payload) => {
      dispatch({type:'SET_SELECTED_DOI', payload});
    }
  }
}
RelatedDoisList.propTypes = {};

RelatedDoisList.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoisList);
