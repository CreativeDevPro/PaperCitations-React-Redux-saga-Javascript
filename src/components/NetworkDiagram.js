import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { totalState } from '../store/states';
import $ from "jquery";
import * as d3 from "d3";


const NetworkDiagram = (props) => {

    // const {setSelectedDoi} = props;
    const {relatedDoiForGraphState, currentOriginalPaper, setSelectedDoi} = props;
    useEffect(() => {
        $(window).on("resize", function () {
          initDiagram()
          drawDiagram(props)
        }).trigger("resize");
      })
    
    
    function initDiagram(){
        $("svg *").remove();
        let svg = d3.select("svg");
        let width = $(svg.node()).parent().width();
        let height = $(svg.node()).parent().height();
        svg.attr("width", width);
        svg.attr("height", height);
    
        d3.select("svg#networkgraph").append('defs')
          .append('marker')
          .attr("id", "Triangle")
          .attr("refX", 17)
          .attr("refY", 3)
          .attr("markerUnits", 'userSpaceOnUse')
          .attr("markerWidth", 6)
          .attr("markerHeight", 9)
          .attr("orient", 'auto')
          .append('path')
          .attr("d", 'M 0 0 6 3 0 6 1.5 3');
      }

      function focusOriginalPaper() {
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
                      author: currentOriginalPaper.authors,
    
                    }
        selectedDoi = {...selectedDoi, metaData: metaData, containMetaData: true }
        setSelectedDoi(selectedDoi);
      }
      function drawDiagram(graph) {

        
        let svg = d3.select("svg#networkgraph"),
          width = +svg.attr("width"),
          height = +svg.attr("height");
    

        svg = svg
          .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
          })).append("g");
    
        var color = d3.scaleOrdinal(d3.schemeCategory20);
        let degreeMax = 0;
        graph.nodes.forEach(d => {
          d.degreeCentrality = graph.links
            .filter(p => p.source === d || p.target === d || p.source === d.id || p.target === d.id)
            .length;
          degreeMax = Math.max(d.degreeCentrality, degreeMax);
        });
        // links
        svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter()
          .append("line");
    
        var link = d3.select("g.links")
          .selectAll("line")
          .attr("style", function (d) { return "stroke:rgba(56,142,60, 0.6)"; })
          .attr("stroke-width", function (d) { return 1; })
    
          .on("mouseover", d => {
            circles.style("opacity", o => {
              return (o.doi == d.source.doi || o.doi == d.target.doi) ? 1 : 0.1
            });
            fullCircles.style("opacity", o => {
              return (o.doi == d.source.doi || o.doi == d.target.doi) ? 0.3 : 0.1
            });
            link.style("stroke-opacity", o => {
              return (o.source == d.source && o.target == d.target) ? 1 : 0.1
            });
            lables.style("opacity", o => {
              return (o.source == d.source && o.target == d.target) ? 1 : 0.1
            });
          })
          .on('mouseout', d => {
            circles.style("opacity", 1);
            link.style("stroke-opacity", 1);
            fullCircles.style("opacity", 0.3);
            lables.style("opacity", 1);
          })
          .attr("marker-end", "url(#Triangle)");
    
        // nodes
        svg.append("g")
          .attr("class", "nodes")
          .selectAll("g")
          .data(graph.nodes)
          .enter()
          .append("g");
    
          var node = d3.select("g.nodes")
          .selectAll("g");
    
          var fullCircles = node.append("circle")
          .attr("r", d => d.nodeLevel==0? 15 : 8)
          .attr("fill", function (d) { 
            return d.nodeLevel==0?"rgba(56,142,60, 0.9)":d.nodeLevel==1?"rgba(56,142,60, 0.6)":"rgba(56,142,60, 0.3)"; })
    
        var circles = node.append("circle")
          .attr("r", d => d.nodeLevel==0? 9.5 : 3.5)
          .attr("fill", function (d) {
            return d.nodeLevel==0?"rgba(56,142,60, 1)":d.nodeLevel==1?"rgba(56,142,60, 0.7)":"rgba(56,142,60, 0.4)"; })
          .on("mouseover", function (d) {
            let highlightDOIs = [d.doi];
            for (let p of graph.links) {
              if (p.source.doi == d.doi) {
                highlightDOIs.push(p.target.doi);
              }
              if (p.target.doi == d.doi) {
                highlightDOIs.push(p.source.doi);
              }
            }
            link.style("stroke-opacity", o => {
              return (o.source.doi == d.doi || o.target.doi == d.doi) ? 1 : 0.1
            });
            circles.style("opacity", o => {
              return highlightDOIs.indexOf(o.doi) > -1 ? 1 : 0.1
            });
            fullCircles.style("opacity", o => {
              return highlightDOIs.indexOf(o.doi) > -1 ? 0.3 : 0.1
            });
            lables.style("opacity", o => {
              return highlightDOIs.indexOf(o.doi) > -1 ? 1 : 0.1
            });
            console.log(d.doi);
            relatedDoiForGraphState.map(doi => {
              if(doi.citing == d.doi) {
                setSelectedDoi(doi)
              }
            })
            if(currentOriginalPaper.doi == d.doi) {
              focusOriginalPaper();
            }
            
          })
          .on('mouseout', d => {
            circles.style("opacity", 1);
            link.style("stroke-opacity", 1);
            fullCircles.style("opacity", 0.3);
            lables.style("opacity", 1);
          })
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
        var lables = node.append("text")
          .attr("font-size",7)
          .text(function (d) {
            return (d.authors && d.authors.length > 0 ? d.authors.split(',')[0] + ", " : "") + d.year;
          })
          .attr('text-anchor', 'middle')
          .attr('x', 0)
          .attr('y', -20);
    
        node.append("title")
          .attr("font-size",7)
          .text(function (d) { return d.title; });
    
        // Let's list the force we wanna apply on the network
        var simulation = d3.forceSimulation(graph.nodes)                 // Force algorithm is applied to data.nodes
          .force("link", d3.forceLink()                               // This force provides links between nodes
            .id(function (d) { return d.id; })                     // This provide  the id of a node
            .links(graph.links)                                    // and this the list of links
          )
          .force("charge", d3.forceManyBody().strength(-400).distanceMax(270).distanceMin(50))             // This adds repulsion between nodes. Play with the -400 for the repulsion strength
          .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
          .on("tick", ticked);
    
        function ticked() {
          link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
    
          node
            .attr("transform", function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            })
        }
    
        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
    
        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }
    
        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
      }
    let width = window.innerWidth;
    let height = window.innerHeight;
        return (
  
          <svg id="networkgraph"
          width={width} height={(height - 90)} >
          </svg>
        )
    }
    

 const mapStateToProps = (state) => {
   return {
    currentOriginalPaper: state.currentOriginalPaper,
    relatedDoiForGraphState: state.relatedDoiForGraphState,
   }
} 
const mapStateToDispatch=(dispatch)=>{
  return {

    setSelectedDoi: (payload) => {
      dispatch({type:'SET_SELECTED_DOI', payload});
  }
}

}

NetworkDiagram.propTypes = {};

NetworkDiagram.defaultProps = {};
export default  connect(mapStateToProps, mapStateToDispatch)( NetworkDiagram ) ;
