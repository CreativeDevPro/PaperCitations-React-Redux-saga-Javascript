import React from "react";
import Home from './Home';
import { connect } from 'react-redux';
import Header from '../components/Header'
import SearchResultsPage from './SearchResultsPage'
import ArticleDetailsPage from './ArticleDetailsPage'
import ArticlesLoadingPage from './ArticlesLoadingPage'
import RelatedDoisLoadingPage from './RelatedDoisLoadingPage'

const  Pages = (props) => {
  const { currentPage } = props;
  return (
    <div>
        <nav>
            <Header />
        </nav>
        {
          (currentPage === 'Home') ?
          <Home /> : ''
        }
        {
          (currentPage === 'ArticlesLoading') ?
          <ArticlesLoadingPage /> : ''
        }
        {
          (currentPage === 'SearchResultsPage') ?
          <SearchResultsPage /> : ''
        }
        {
          (currentPage === 'ArticleDetailsPage') ?
          <ArticleDetailsPage /> : ''
        }
        {
          (currentPage === 'RelatedDoisLoadingPage') ?
          <RelatedDoisLoadingPage /> : ''
        }
        
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