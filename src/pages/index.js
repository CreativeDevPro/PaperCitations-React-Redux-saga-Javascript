import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import { connect } from 'react-redux';
import Header from '../components/Header'
import {totalState }from '../store/states';
import SearchResultsPage from './SearchResultsPage'
import ArticleDetailsPage from './ArticleDetailsPage'
import ArticlesLoadingPage from './ArticlesLoadingPage'

const  Pages = (props) => {
  const { currentPage } = props;
  console.log(currentPage);
  return (
    <div>
        <nav>
            <Header />
        </nav>
        {
          (currentPage == 'Home') ?
          <Home /> : ''
        }
        {
          (currentPage == 'ArticlesLoading') ?
          <ArticlesLoadingPage /> : ''
        }
        {
          (currentPage == 'SearchResultsPage') ?
          <SearchResultsPage /> : ''
        }
        {
          (currentPage == 'ArticleDetailsPage') ?
          <ArticleDetailsPage /> : ''
        }
        
        
        {/* <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/articles/loading" component={ArticlesLoadingPage} />
            <Route exact path="/searchResults" component={SearchResultsPage} />
            <Route exact path="/details" component={ArticleDetailsPage} />
        </Switch> */}
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {
    currentPage: state.currentPage,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Pages);