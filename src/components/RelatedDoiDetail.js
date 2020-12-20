import {React, useState} from 'react';
import { connect } from 'react-redux';
import {totalState }from '../store/states';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';

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
    right: "0px",
    height: "calc(100% - 65px)",
    boxShadow: "3px 3px 20px"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
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
  lineHeight1_2em: {
    lineHeight: "1.2em"
  },
  lineHeight1_5em: {
    lineHeight: "1.5em"
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover",
  },
}));

const RelatedDoiDetail = (props) => {
  const { selectedDoi, relatedDoiState,  currentOriginalPaper, fetchingMetaDataCheck, loadMetaDataInfoForGraph, setCurrentPage, setCurrentOriginalPaper, setFetchingRelatedDoisStatus, setSelectedDoi} = props;

  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const buildGraph = () =>(event) => {

    loadMetaDataInfoForGraph(selectedDoi);
    
  }

  relatedDoiState.map ( citation => {
    if(citation.citing === selectedDoi && fetchingMetaDataCheck === true) {
      let originalPaper = {
        title: citation.metaData.title,
        citations: citation.metaData.citation,
        year: citation.metaData.year,
        journal: '',
        locator: '',
        authors: citation.metaData.author,
        url: '',
        doi: citation.citing,
      }
      setCurrentOriginalPaper( originalPaper );
      setSelectedDoi('original');
      setCurrentPage('RelatedDoisLoadingPage');
      setFetchingRelatedDoisStatus();
    }
    return 1;
  })

  let currentDoi;
  relatedDoiState.map(doi => {
    if(doi.citing === selectedDoi) {
      currentDoi = doi;
    }
    return 1;
  })

  return (
    <div>

        { open ?
            <div className={classes.root} >
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton id="rightDirectionCloseIcon" onClick={handleDrawerClose}> 
                    {theme.direction === 'rtr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                
                <div style={{display: "flex", justifyContent: "center", width: "calc(100% - 65px)"}}>Paper Info</div>
                </div>
                <Divider />
                {
                  selectedDoi === 'original' ?
                  <div style={{paddingLeft: "8px", paddingTop: "5px"}}>
                    <Typography style={{fontSize: "17px"}} gutterBottom variant="h5" component="h2" className={classes.lineHeight1_2em}>
                    <Link href={`http://dx.doi.org/${currentOriginalPaper.doi}`} variant="h6" color="inherit" target="_blank" rel="opener">{ currentOriginalPaper.title}</Link>
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px" }}
                    >
                      {currentOriginalPaper.authors}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px" }}
                    >
                      {currentOriginalPaper.year}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px" }}
                    >
                      {relatedDoiState.length} Citations
                    </Typography>
                  </div>

                  :
                  <div>
                  {
                    currentDoi.containMetaData ?
                      <div style={{paddingLeft: "8px", paddingTop: "5px"}}>
                        <Typography style={{fontSize: "17px"}} gutterBottom variant="h5" component="h2" className={classes.lineHeight1_2em}>
                        <Link href={`http://dx.doi.org/${currentDoi.metaData.doi}`} variant="h6" color="inherit" target="_blank" rel="opener">{ currentDoi.metaData.title}</Link>
                        </Typography>
                        
                        <Typography
                          color="textSecondary"
                          variant="subheading"
                          component="div"
                          className={classes.lineHeight1_5em}
                          style={{ fontSize: "14px" }}
                        >
                          {currentDoi.metaData.author}
                        </Typography>

                        <Typography
                          color="textSecondary"
                          variant="subheading"
                          component="div"
                          className={classes.lineHeight1_5em}
                          style={{ fontSize: "14px" }}
                        >
                          {currentDoi.metaData.year}, {currentDoi.metaData.source_title}
                        </Typography>

                        <Typography
                          color="textSecondary"
                          variant="subheading"
                          component="div"
                          className={classes.lineHeight1_5em}
                          style={{ fontSize: "14px" }}
                        >
                          {currentDoi.metaData.citation.length} Citations, {currentDoi.metaData.reference.length} References
                        </Typography>
                      </div> 
                    :
                      <div style={{ paddingTop: "5px", paddingLeft: "8px"}}>
                        <Typography style={{fontSize: "17px"}} gutterBottom variant="h5" component="h2" className={classes.lineHeight1_2em}>
                        <Link href={`http://dx.doi.org/${currentDoi.citing}`} variant="h6" color="inherit" target="_blank" rel="opener">{currentDoi.citing}</Link>
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subheading"
                          component="div"
                          className={classes.lineHeight1_5em}
                          style={{ fontSize: "14px", paddingLeft: "-8px", paddingTop: "5px"}}
                        >
                          {/* <b>DOI</b>:   {currentDoi.citing}
                          <br></br> */}
                          {currentDoi.creation}
                        </Typography>
                        
                      </div>
                  }
                  </div>
                }
 
                  <Typography style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    {
                      !(selectedDoi === 'original') ?
                      <Button onClick={buildGraph()} variant="outlined" style={{ width: "110px", height: "28px", fontSize: "9px"}}>
                          Build Graph
                      </Button> :
                      "Original Paper"
                    }
                    
                  </Typography>

          </Drawer>
          </div>
        :
        <IconButton onClick={handleDrawerOpen} style={{ position: "absolute", right: "0px" }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    }
    </div>
  )
};

const mapStateToProps=(state = totalState)=>{

  return {
    relatedDoiState: state.relatedDoiState,
    selectedDoi: state.selectedDoi,
    currentOriginalPaper: state.currentOriginalPaper,
    articlesState: state.articlesState,
    fetchingMetaDataCheck: state.fetchingMetaDataCheck,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    loadMetaDataInfoForGraph: (payload) => {
      dispatch({type:'LOAD_METADATA_OF_DOI_FOR_GRAPH', payload});
    },
    getArticles:(input, extraParams)=>{
      dispatch({type:'GET_ALL_ARTICLES',input, extraParams});
    },
    setCurrentPage: (payload) => {
      dispatch({type:'SET_CURRENT_PAGE', payload});
    },
    setCurrentOriginalPaper: (payload) => {
      dispatch({type:'SET_CURRENT_ORIGINAL_PAPER', payload});
    },
    setFetchingRelatedDoisStatus: (payload) => {
      dispatch({type:'SET_FETCHING_RELATED_DOIS_STATUS', payload});
    },
    setSelectedDoi: (payload) => {
      dispatch({type:'SET_SELECTED_DOI', payload});
    }
  }
}
RelatedDoiDetail.propTypes = {};

RelatedDoiDetail.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoiDetail);
