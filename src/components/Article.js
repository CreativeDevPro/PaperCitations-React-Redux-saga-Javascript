import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router';
import Link from '@material-ui/core/Link';
import { teal } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

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
  let journalDetail = "";
  journalDetail = props.article.year + props.article.journal + " " + props.article.locator.join(", ")
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
          {(journalDetail.length>45)?journalDetail.substr(0,45)+'...':journalDetail}
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
        <ColorButton variant="contained" color="primary" className={classes.margin} >
          Build Graph
        </ColorButton>
      </CardActions>
    </Card>
  )
};

Article.propTypes = {};

Article.defaultProps = {};

export default Article;
