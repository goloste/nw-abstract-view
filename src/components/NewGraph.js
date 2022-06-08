import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import {
  select,
  pointer,
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceRadial,
} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
// import logo from '../images/Ericsson_logo.svg'
// import logo from '../images/Ericsson_logo_shiny_black.svg'
import logo from '../images/Ericsson_logo_shiny_celestino.svg'
import swLogo from '../images/swLogo.png'

const NewGraph = ({nodeInput, linkInput}) => {
  // Container elements reference, container dimensions
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // const dimensions = {width: 500, height: 500}

  var nodeData = nodeInput
  var linkData = linkInput
  
  // var [nodeData, setNodeData] = useState([])
  // var [linkData, setLinkData] = useState([])
  // setNodeData(nodeInput)
  // setLinkData(linkInput)
  // console.log(nodeInput)



  // Code Below is called initially and on every data change
  useEffect(() => {
    if (!dimensions) return; // Exits if could not solve for dimensions

    // Compute data
    const computeMsg = () => {
      if (nodeData != null) {
        var currentdate = new Date();
        var datetime = "Last Sync : " + currentdate.getDay() + "/" + currentdate.getMonth() 
        + "/" + currentdate.getFullYear() + " " 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        return datetime
      } else
      {
        return "It seems there is no topology information"
      }
    }

    const msg = computeMsg()

    var linkCoords = [];    
    computeLinkCoords();
    
    function computeLinkCoords () {
        linkCoords = []
        // var coords = []
        linkData.forEach(function(d) {
            linkCoords.push({
                "x1": nodeData.find(el => el.id === d.source).x,
                "y1": nodeData.find(el => el.id === d.source).y,
                "x2": nodeData.find(el => el.id === d.target).x,
                "y2": nodeData.find(el => el.id === d.target).y,
                "source": d.source,
                "srcintf": d.srcintf,
                "destination": d.destination,
                "dstintf": d.srcintf,
                "totBW": d.totBW,
                "freeBW": d.freeBW,
                "usedBW": d.usedBW
            })
        });
        // return coords;
    }
    
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
        const msg = computeMsg()
        svg
          .selectAll(".alpha")
          .data(nodeData)
          .join("text")
          .attr("class", "alpha")
          .text(`${msg}`)
          .attr("x", -dimensions.width / 2 + 10)
          .attr("y", -dimensions.height / 2 + 25);

        // links
        var links = svg
          .selectAll(".link")
          .data(linkCoords)
          .join("line")
          .attr("class", "link")
          .attr("stroke-width", 5)
          .attr("stroke", "gray")
          .attr("fill", "none")
          .attr("x1", link => link.x1)
          .attr("y1", link => link.y1)
          .attr("x2", link => link.x2)
          .attr("y2", link => link.y2)
        
        // var infoRect =  svg
        //   .selectAll(".infoRect")
        //   .data(nodeData)
        //   .join("rect")
        //   .filter(function (d) { return d.toggle_info == true })
        //   .attr("class", "infoRect")
        //   .attr("width", 160)
        //   .attr("height", 130)
        //   .attr("fill", "navy")
        //   .attr("x", node => node.x)
        //   .attr("y", node => node.y + 50)
        
        var infoText = svg
          .selectAll(".infoText")
          .data(nodeData)
          .join("text")
          // .filter(function (d) { return d.toggle_info == true })
          .attr("class", "infoText")
          .attr("id", node => node.id)
          .attr("text-anchor", "middle")
          .attr("font-size", 20)
          .attr("fill", "green")
          // .attr("x", node => node.x -100)
          // .attr("y", node => node.y + 60)
          .attr("x", function (node) {
            if (node.x >= 0) {
              return node.x + 60
            } else {
              return node.x - 60
            }
          })
          .attr("y", function (node) {
            if (node.y >= 0) {
              return node.y + 60
            } else {
              return node.y - 80
            }
          })
          .text(node => "Tech type: " + node.tech_type)
        

        // nodes
        var nodes = svg
          .selectAll(".node")
          .data(nodeData)
          // .join("circle")
          // .attr("class", "node")
          // .attr("r", 15)
          // .attr("cx", node => node.x)
          // .attr("cy", node => node.y)
          .join("svg:image")
          .attr("class", "node")
          .attr("xlink:href", (node)=>{
            if(node.tech_type === 'Optical') {return logo}
            if(node.tech_type === 'Packet') {return swLogo}
          })
          .attr("x", node => node.x - 25)
          .attr("y", node => node.y - 25)
          .attr("width", 64)
          .attr("height", 64)
          .call(d3.drag().on('drag', (d)=>{

            var xCord = d.x
            var yCord = d.y
            if (xCord >= dimensions.width/2 - 120) {xCord = dimensions.width/2 - 120}
            if (xCord <= -dimensions.width/2 + 120) {xCord = -dimensions.width/2 + 120}
            if (yCord >= dimensions.height/2 - 120) {yCord = dimensions.height/2 - 120}
            if (yCord <= -dimensions.height/2 + 120) {yCord = -dimensions.height/2 + 120}
            
            d.subject.fx = xCord
            d.subject.fy = yCord
            simulation.restart()
          }))
          .on("click", (d) => {
            // console.log(`${d.index}`)
          });


        // labels
        var labels = svg
          .selectAll(".label")
          .data(nodeData)
          .join("text")
          .attr("class", "label")
          .attr("text-anchor", "middle")
          .attr("font-size", 30)
          .attr("font-weight", 700)
          .text(node => node.id)
          .attr("x", node => node.x)
          .attr("y", node => node.y -30);

        computeLinkCoords()
        simulation.restart()
        // console.log(linkCoords)
    });

    svg.on("click", (event) => {
        const [x, y] = pointer(event);
        simulation
          .alpha(0.5)
          .restart()
          .force("orbit", forceRadial(200, x, y).strength(0.8))
          .restart();
    });

  }, [
        nodeData, 
        linkData, 
        dimensions
      ]); // End of useEffect()

  return (
    // <div ref={wrapperRef} style={{ marginTop: "60rem", marginBottom: "5rem" }}>
    <div ref={wrapperRef} style={{ marginTop: "60rem", marginBottom: "5rem" }}>
      <h1>Network Topology Graph</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default NewGraph;
