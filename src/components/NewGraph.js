import React, { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import {
  select,
  pointer,
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceRadial
} from "d3";

import useResizeObserver from "../hooks/useResizeObserver";

const NewGraph = ({nodeData, linkData}) => {
  // Container elements reference, container dimensions
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // Code Below is called initially and on every data change
  useEffect(() => {
    if (!dimensions) return; // Exits if could not solve for dimensions

    // Compute data
    // const nodeData = [
    //     {"id":"1", "x": -10, "y": -10}, 
    //     {"id":"2", "x": 10, "y": 10},
    //     {"id":"3", "x": 16, "y": 21},
    //     {"id":"4", "x": -66, "y": 34},
    //     {"id":"5", "x": 55, "y": -17}
    // ]
    // const linkData = [
    //     {"source": "1", "target": "2"},
    //     {"source": "2", "target": "3"},
    //     {"source": "3", "target": "1"},
    //     {"source": "1", "target": "4"},
    //     {"source": "5", "target": "4"}
    // ]

    var linkCoords = []
    
    computeLinkCoords()
    
    function computeLinkCoords () {
        linkCoords = []
        // var coords = []
        linkData.forEach(function(d) {
            linkCoords.push({
                "x1": nodeData.find(el => el.id == d.source).x,
                "y1": nodeData.find(el => el.id == d.source).y,
                "x2": nodeData.find(el => el.id == d.target).x,
                "y2": nodeData.find(el => el.id == d.target).y,
            })
        })
        // return coords;
    }
    
    // console.log(linkCoords)

    // Initialize svg
    const svg = select(svgRef.current); // Hooks to referenced html svg element
    // Centering
    svg.attr("viewBox", [
      -dimensions.width/2,
      -dimensions.height/2,
      dimensions.width,
      dimensions.height
    ]);
    
    // Main simulation
    const simulation = forceSimulation(nodeData)
      .force("charge", forceManyBody().strength(-30))
      .force("collide", forceCollide(30))
      .on("tick", () => {
        // console.log("current force", simulation.alpha());

        // current alpha text
        svg
          .selectAll(".alpha")
          .data([{}])
          .join("text")
          .attr("class", "alpha")
          .text("Some text inside SVG")
          .attr("x", -dimensions.width / 2 + 10)
          .attr("y", -dimensions.height / 2 + 25);

        // links
        var links = svg
          .selectAll(".link")
          .data(linkCoords)
          .join("line")
          .attr("class", "link")
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("x1", link => link.x1)
          .attr("y1", link => link.y1)
          .attr("x2", link => link.x2)
          .attr("y2", link => link.y2);

        // nodes
        var nodes = svg
          .selectAll(".node")
          .data(nodeData)
          .join("circle")
          .attr("class", "node")
          .attr("r", 15)
          .attr("cx", node => node.x)
          .attr("cy", node => node.y)
          .call(d3.drag().on('drag', (d)=>{
            d.subject.fx = d.x
            d.subject.fy = d.y
            simulation.restart()
          }));

        // labels
        var labels = svg
          .selectAll(".label")
          .data(nodeData)
          .join("text")
          .attr("class", "label")
          .attr("text-anchor", "middle")
          .attr("font-size", 20)
          .text(node => node.id)
          .attr("x", node => node.x)
          .attr("y", node => node.y - 20);


        computeLinkCoords()
        simulation.restart()
        // console.log(linkCoords)
    });

    svg.on("click", (event) => {
        const [x, y] = pointer(event);
        simulation
          .alpha(0.5)
          .restart()
          .force("orbit", forceRadial(100, x, y).strength(0.8))
          .restart();
    });

  }, [nodeData, linkData, dimensions]); // End of useEffect()

  return (
    <div ref={wrapperRef} style={{ marginTop: "2rem", marginBottom: "5rem" }}>
      <p>New Graph Component</p>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default NewGraph;
