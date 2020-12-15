import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import { teal } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    marginLeft: 5 * theme.spacing.unit,
    marginRight: 5 * theme.spacing.unit,
  },
  contentArea: {
    padding: "16px 24px 0 24px",
  },
  textInline: {
    textOverflow: "ellipsis", WebkitLineClamp: "1", display: "-webkit-box", WebkitBoxOrient: "vertical", whiteSpace: "normal", overflow: "hidden"
  }

}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
}))(Button);

const Article = (props) => {
  const classes = useStyles();
  const {  setCurrentPage, setCurrentOriginalPaper, setFetchingRelatedDoisStatus } = props;
  let journalDetail = "";
  if(props.article.journal != null)
  {
    journalDetail = props.article.year + props.article.journal + " " + props.article.locator.join(", ")
  }
  else {
    journalDetail = props.article.year + " " + props.article.locator.join(", ")
  } 

  const buildGraph = () => {
    setCurrentOriginalPaper( props.article );
    setCurrentPage('RelatedDoisLoadingPage');
    setFetchingRelatedDoisStatus();
    
  }
  return (
    <Card className={classes.card} raised style={{ margin: "5px, 20px" }} >
      <CardContent className={classes.contentArea}>
        <Link href={props.article.url} variant="h6" color="inherit" className={classes.textInline} target="_blank" rel="opener" >
          {(props.article.title.length > 45) ? props.article.title.substr(0, 45) + '...' : props.article.title}
        </Link>
        <Typography
          color="textSecondary"
          variant="h7"
          component="div"
          className={classes.textInline}
        >
          { journalDetail }
        </Typography>
        <Typography component="p" className={classes.textInline}>
          Authors: {(props.article.authors.length > 45) ? props.article.authors.substr(0, 45) + '...' : props.article.authors}
          <br />
          </Typography>
          <Typography className={classes.textInline}>
            DOI:
            <Link href={props.article.doi} variant="h7" color="inherit" target="_blank" rel="opener" >
            {props.article.doi}
          </Link>
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonArea}>
        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={ buildGraph }>
          Build Graph
        </ColorButton>
      </CardActions>
    </Card>
  )
};

const mapStateToProps=(state)=>{

  return {
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    setCurrentPage: (payload) => {
      dispatch({type:'SET_CURRENT_PAGE', payload});
    },
    setCurrentOriginalPaper: (payload) => {
      dispatch({type:'SET_CURRENT_ORIGINAL_PAPER', payload});
    },
    setFetchingRelatedDoisStatus: (payload) => {
      dispatch({type:'SET_FETCHING_RELATED_DOIS_STATUS', payload});
    }
  }
}


Article.propTypes = {};

Article.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(Article);
