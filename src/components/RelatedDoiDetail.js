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
  const { selectedDoi } = props;

  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
                    props.selectedDoi.containMetaData ?
                    <div style={{paddingLeft: "8px", paddingTop: "5px"}}>
                    <Typography style={{fontSize: "17px"}} gutterBottom variant="h5" component="h2" className={classes.lineHeight1_2em}>
                      <b>Title</b>: { props.selectedDoi.metaData.title}
                    </Typography>
                    <br></br>
                    <Typography component="p" className={classes.lineHeight1_5em}>
                      <b>Source</b>: {props.selectedDoi.metaData.source_title}
                    </Typography>
                    <br></br>
                    <Typography component="p" className={classes.lineHeight1_5em}>
                      <b>Authors</b>: {props.selectedDoi.metaData.author}
                    </Typography>
                    <br></br>
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px" }}
                    >
                      <b>DOI</b>: {props.selectedDoi.metaData.doi}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px"}}
                    >
                      <b>Year</b>:   {props.selectedDoi.metaData.year}
                    </Typography> 
                    </div> :
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px", paddingLeft: "8px", paddingTop: "5px"}}
                    >
                      <b>DOI</b>:   {props.selectedDoi.citing}
                      <br></br>
                      <b>Creation</b>: {props.selectedDoi.creation}
                    </Typography>
                     }
                    { props.selectedDoi.cited !== '' ?
                      <Typography style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                        {
                          !(props.selectedDoi.cited === 'original') ?
                          <Button variant="outlined" style={{ width: "110px", height: "28px", fontSize: "9px"}}>
                              Build Graph
                          </Button> :
                          "Original Paper"
                        }
                        
                      </Typography> :
                      ""
                    }
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
    selectedDoi: state.selectedDoi,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    getArticles:(input, extraParams)=>{
      dispatch({type:'GET_ALL_ARTICLES',input, extraParams});
    },
  }
}
RelatedDoiDetail.propTypes = {};

RelatedDoiDetail.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoiDetail);
