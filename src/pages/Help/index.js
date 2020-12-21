import React from 'react';
import { connect } from 'react-redux';

const Help = (props) => {
  
  return (
    <div style={{marginLeft: "100px", marginRight: "100px", marginTop: "100px"}}>
        <h1>
          How does it work?
        </h1>
        <ul>
          <li><b>To create each graph, we analyze an order of ~50,000 papers</b> and select the few dozen with the strongest connections to the origin paper.</li>
          <li>In the graph, <b>papers are arranged according to their similarity</b>. That means that even papers that do not directly cite each other can be strongly connected and very closely positioned. Connected papers is not a citation tree</li>
          <li>Our similarity metric is based on the concepts of <b>Co-citation and Bibliographic Coupling.</b><br></br> According to this measure, two papers that have highly overlapping citations and references are presumed to have higher chance of treating a related subject matter.</li>
          <li>Our algorithm then builds a <b>Force Directed Graph</b> to distribute the papers in a way that visually clusters similar papers together and pushes less similar papers away from each other. Upon node selection we <b>highlight the shortest path from each node to the original paper</b> in similarity space.</li>
          <li>Our database is connected to the Semantic Scholar Paper Corpus(licensed under ODC-BY). Their team has done an amazing job of compiling <b>hundreds of millions of published papers across many scientific fields</b></li>
        </ul>
    </div>
  )
};

const mapStateToProps=(state)=>{

  return {
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    
  }
}


Help.propTypes = {};

Help.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(Help);
