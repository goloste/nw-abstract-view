import React, { useRef, useEffect, useCallback } from "react";
import {
  select,
  hierarchy,
  forceSimulation,
  forceManyBody,
  pointer,
//   forceX,
//   forceY,
  forceCollide,
  forceRadial
} from "d3";

import * as d3 from "https://cdn.skypack.dev/d3@7"
// import * as d3 from 'd3'

import useResizeObserver from '../hooks/useResizeObserver.js'
/**
 * Component, that renders a force layout for hierarchical data.
 */

function ForceTreeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    if (!dimensions) return;
    const svg = select(svgRef.current);

    // centering workaround
    svg.attr("viewBox", [
      -dimensions.width / 2,
      -dimensions.height / 2,
      dimensions.width,
      dimensions.height
    ]);

    // d3 util to work with hierarchical data
    const root = hierarchy(data);
    const nodeNum = root.copy().sum(d => 1).value
    const nodeData = root.descendants();
    const linkData = root.links();

    // console.log(linkData)

    const simulation = forceSimulation(nodeData)
      .force("charge", forceManyBody().strength(-30))
      .force("collide", forceCollide(30))
      .on("tick", () => {
        // console.log("current force", simulation.alpha());

        // current alpha text
        svg
          .selectAll(".alpha")
          .data([data])
          .join("text")
          .attr("class", "alpha")
        //   .text(simulation.alpha().toFixed(2))
          .text("Total number of nodes : " + nodeNum)
          .attr("x", -dimensions.width / 2 + 10)
          .attr("y", -dimensions.height / 2 + 25);

        // links
        var links = svg
          .selectAll(".link")
          .data(linkData)
          .join("line")
          .attr("class", "link")
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("x1", link => link.source.x)
          .attr("y1", link => link.source.y)
          .attr("x2", link => link.target.x)
          .attr("y2", link => link.target.y);

        // nodes
        var nodes = svg
          .selectAll(".node")
          .data(nodeData)
          .join("circle")
          .attr("class", "node")
          .attr("r", 10)
          .attr("cx", node => node.x)
          .attr("cy", node => node.y+20)
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
          .text(node => node.data.name)
          .attr("x", node => node.x)
          .attr("y", node => node.y);
      });

    // svg.on("mousemove", (event) => {
    //   const [x, y] = pointer(event);
    //   simulation
    //     .force(
    //       "x",
    //       forceX(x).strength(node => 0.2 + node.depth * 0.15)
    //     )
    //     .force(
    //       "y",
    //       forceY(y).strength(node => 0.2 + node.depth * 0.15)
    //     );
    // });

    svg.on("click", (event) => {
      const [x, y] = pointer(event);
      simulation
        .alpha(0.5)
        .restart()
        .force("orbit", forceRadial(100, x, y).strength(0.8));
    //   // render a circle to show radial force
    //   svg
    //     .selectAll(".orbit")
    //     .data([data])
    //     .join("circle")
    //     .attr("class", "orbit")
    //     .attr("stroke", "green")
    //     .attr("fill", "none")
    //     .attr("r", 100)
    //     .attr("cx", x)
    //     .attr("cy", y);
    });


  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginTop: "100rem", marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ForceTreeChart;