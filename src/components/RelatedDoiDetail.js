import {React , useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { ArticleService } from '../services/article.service'
// import { getArticles } from './../../store/actions/articles.action'
import { connect } from 'react-redux';
import {totalState }from '../store/states';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // height: "calc(100% - 65px)",
    // maarginTop: "65px",
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
    // necessary for content to be below app bar
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
  // useEffect(() => {
  
  //   getArticles('artificial intelligence', {
  //     itemsPerPage: 20,
  //     currentOffset: 0,
  //   })
  //   console.log('initialized');
  // }, []);
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
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                
                <div style={{marginLeft: "20px"}}>Doi Info</div>
                </div>
                <Divider />
                {/* <CardContent style={{ display: (!this.state.metadataLoding ? "inline" : "none") }}> */}
                  {
                    props.selectedDoi.containMetaData ?
                    <div style={{paddingLeft: "8px", paddingTop: "5px"}}>
                    <Typography style={{fontSize: "17px"}} gutterBottom variant="h5" component="h2" className={classes.lineHeight1_2em}>
                      { props.selectedDoi.metaData.title}
                    </Typography>
                    <Typography component="p" className={classes.lineHeight1_5em}>
                      Authors: {props.selectedDoi.metaData.authors}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px" }}
                    >
                      DOI:   {props.selectedDoi.metaData.doi}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subheading"
                      component="div"
                      className={classes.lineHeight1_5em}
                      style={{ fontSize: "14px"}}
                    >
                      Date:   {props.selectedDoi.metaData.year}
                    </Typography> 
                    </div> :
                    "" }
                    { props.selectedDoi.cited != '' ?
                      <Typography style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                        {
                          !(props.selectedDoi.cited == 'original') ?
                          <Button variant="outlined" style={{ width: "110px", height: "28px", fontSize: "9px"}}>
                              Build Graph           
                          </Button> :
                          "Original Paper"
                        }
                        
                      </Typography> :
                      ""
                    }
                  {/* <Typography
                    color="textSecondary"
                    variant="subheading"
                    component="div"
                    className={classes.lineHeight1_5em}
                  >
                    Journal:   {selectedDoi.article.metaData.journal}{" "}
                  </Typography> */}
                  {/* <Typography>
                    <p style={{ display: this.state.inx == 0 ? "block" : "none"}}>Original Paper</p>
                    <Button style={{ display: this.state.inx != 0 ? "block" : "none"}} variant="contained" size="small" color="default"
                      onClick={() => { }}>
                      Build a graph
                    </Button>
                  </Typography> */}
              {/* </CardContent> */}
                {/* <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List> */}
                {/* <Divider /> */}
                {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List> */}
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
