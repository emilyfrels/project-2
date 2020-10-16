// console.log because we can
console.log("Project 2 - Jeanine, Jeff, & Emily");
console.log("logic.js");

//-------------------------------------------------------//
//                DEFINE SVG AREA                        //
//-------------------------------------------------------//


// // define SVG area dimensions
// var svgHeight = window.innerHeight;
// var svgWidth = window.innerWidth;

var svgHeight = 500;
var svgWidth = 800;

console.log(`SVG Height: ${svgHeight}`);
console.log(`SVG Width: ${svgWidth}`);

// define margins
var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
};

// define chart area
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

console.log(`Chart Height: ${chartHeight}`);
console.log(`Chart Width: ${chartWidth}`);


// create svg container
var svg = d3.select("#us-map")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// transform the chart
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);