const DEPARTMENTS2 = [
  "Department of Defense--Military Programs",
  "Department of Education",
  "Department of Homeland Security",
  "National Aeronautics and Space Administration",
];

document.addEventListener("DOMContentLoaded", () => {
  // fetch("data/outlays_by_agency_dept_keyed.json")
  //   .then(data => data.json())
  //   .then((blob) => {
  //     const data = JSON.parse(blob);
  //     window.data = data;
  //     makeChart(data);
  //   });
  fetch("data/outlays_by_agency_year_keyed.json")
    .then(data => data.json())
    .then((blob) => {
      const data = JSON.parse(blob);
      // window.data = data;
      makeBarChart(data);
    });
});

// this is a pretty good example https://bl.ocks.org/d3noob/8952219
function makeBarChart(barData) {
  // set the dimensions and margins of the graph
  const margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the ranges
  const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  const y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3.select(".d3-chart-container")
    .append("svg")
    .attr("class", "barchart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // format the data, turn it into 2-element arrays
  let data = Object.entries(barData["2018"]);

  // filter the things you care about
  data = data.filter(el => DEPARTMENTS.includes(el[0]));

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d[0]; }))
  y.domain([0, d3.max(data, function(d) { return d[1] })]);

  // JUSTIN YOU STOPPED HERE
  // append the rectangles for the bar chart
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) {
      console.log('d: ', d);
      console.log('y(d[1]): ', y(d[1]));
      return height - y(d[1]);
    });

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
     .call(d3.axisLeft(y));
}