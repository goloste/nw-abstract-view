import * as d3 from 'd3'
// import { useEffect } from 'react'

const draw = () => {
    d3.select('.drawnMsg').text('Ciao')

    // grab svg
    // let svg = d3.select('.svgImg')
    // let width = svg.attr('width')
    // let height = svg.attr('height')

    // const graph = {
    //     nodes: [
    //         { name: "Alice" },
    //         { name: "Bob" },
    //         { name: "Chen" },
    //         { name: "Dawg" },
    //         { name: "Ethan" },
    //         { name: "George" },
    //         { name: "Frank" },
    //         { name: "Hanes" }
    //     ],
    //     links: [
    //         { source: "Alice", target: "Bob" },
    //         { source: "Chen", target: "Bob" },
    //         { source: "Dawg", target: "Chen" },
    //         { source: "Hanes", target: "Frank" },
    //         { source: "Hanes", target: "George" },
    //         { source: "Dawg", target: "Ethan" }
    //     ]
    // };

    // var simulation = d3
    //     .forceSimulation(graph.nodes)
    //     .force("link", d3.forceLink().id(function(d) {return d.name;}).links(graph.links))
    //     .force("charge", d3.forceManyBody().strength(-30))
    //     .force("center", d3.forceCenter(500/2, 500/2))
    //     // .on("tick", ticked);
    
    // var link = svg
    //     .append("g")
    //     .attr("class", "links")
    //     .selectAll("line")
    //     .data(graph.links)
    //     .enter()
    //     .append("line")
    //     .attr("stroke-width", function(d) {return 3;});
    
    // var node = svg
    //     .append("g")
    //     .attr("class", "nodes")
    //     .selectAll("circle")
    //     .data(graph.nodes)
    //     .enter()
    //     .append("circle")
    //     .attr("r", 5)
    //     .attr("fill", function(d) {return "red";})
    //     .call(d3.drag()
    //         // .on("start", dragstarted)
    //         // .on("drag", dragged)
    //         // .on("end", dragended)
    // );
    // function ticked() {
    //     link
    //       .attr("x1", function(d) {
    //         return d.source.x;
    //       })
    //       .attr("y1", function(d) {
    //         return d.source.y;
    //       })
    //       .attr("x2", function(d) {
    //         return d.target.x;
    //       })
    //       .attr("y2", function(d) {
    //         return d.target.y;
    //       });
    
    //     node
    //       .attr("cx", function(d) {
    //         return d.x;
    //       })
    //       .attr("cy", function(d) {
    //         return d.y;
    //       });
    //   }
    
    //   function dragstarted(d) {
    //     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    //     d.fx = d.x;
    //     d.fy = d.y;
    //   }
    
    //   function dragged(d) {
    //     d.fx = d3.event.x;
    //     d.fy = d3.event.y;
    //   }
    
    //   function dragended(d) {
    //     if (!d3.event.active) simulation.alphaTarget(0);
    //     d.fx = null;
    //     d.fy = null;}
}
// ----------------------------------------------
// ----------------------------------------------
const TopologyGraph = ({nodes, links}) => {        
    draw()
    return (
    <div className='topologyGraph'>
       {/* <style>
        .links line {
        stroke: #999;
        stroke-opacity: 0.6;},
        .nodes circle {
        stroke: #fff;
        stroke-width: 1.5px;}
      </style> */}
      <h3>Topology Graph</h3>
      <p className='drawnMsg'></p>
      <svg className='svgImg' width="500" height="500"></svg>
      {/* <script src="https://d3js.org/d3.v4.min.js"></script> */}
    </div>
  )
}

export default TopologyGraph