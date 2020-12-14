import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import Header from '../components/Header'
import SearchResultsPage from './SearchResultsPage'
import ArticleDetailsPage from './ArticleDetailsPage'
import ArticlesLoadingPage from './ArticlesLoadingPage'

export default function Pages() {
  return (
    <div>
        <nav>
            <Header />
        </nav>
        
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/articles/loading" component={ArticlesLoadingPage} />
            <Route exact path="/searchResults" component={SearchResultsPage} />
            <Route exact path="/details" component={ArticleDetailsPage} />
        </Switch>
    </div>
  );
}

// export default Pages;