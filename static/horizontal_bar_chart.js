document.addEventListener("DOMContentLoaded", () => {
  fetchData("data/outlays_by_agency_year_keyed.json")
    .then(data => {
      horizontalBarChart(data, 2018);
      return data;
    })
    .then(data => window.ALL_CATEGORIES = Object.keys(data[2018]));
});

const activeFilters = DEPARTMENTS;

// i think you're better off building another supporting data structure off the bat:
// { DoD: { name: "DoD", value: 12345 }, Legislative: { name: "", value: 123 }}
// can avoid a lot of array operations that way
function filterYearData(yearData, departments) {
  let data = [];
  Object.entries(yearData).map((pair) => {
    data.push({ name: pair[0], value: pair[1] });
  });

  return data.filter(obj => departments.includes(obj.name) && obj.value > 0);
}
// for updating data:
// https://bl.ocks.org/d3noob/7030f35b72de721622b8
// http://bl.ocks.org/alansmithy/e984477a741bc56db5a5 // maybe this one?
function formatData(yearData, testFilter) {
  let data = [];
  // format to { name: namestr, value: int} for ease of use
  Object.entries(yearData).map((pair) => {
    data.push({ name: pair[0], value: pair[1] });
  });

  //sort bars based on value
  data.sort(function (a, b) { return d3.descending(a.value, b.value); });
  data = data.filter(obj => obj.value > 0 && obj.name !== "Total outlays");
  if (testFilter) {
    data = data.filter(obj => DEPARTMENTS.includes(obj.name));
  }

  return data;
}

// https://bl.ocks.org/caravinden/eb0e5a2b38c8815919290fa838c6b63b
function horizontalBarChart(fullData, year) {
  const yearData = fullData[year];
  const data = filterYearData(yearData, DEPARTMENTS);

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  const margin = { top: 15, right: 25, bottom: 15, left: 60 };
  const width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  window.y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1)
    .domain(data.map(d => d.name));

  // const x = d3.scaleSymlog()
  // // const x = d3.scaleLinear()
  //   .range([0, width]) // log scale needs a different min, or way more values
  //   .domain([0, d3.max(data, d => d.value)]);

  window.x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(data, d => d.value)]);

  window.svg = d3.select(".horizontal-bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // create the bars
  svg.selectAll(".bar")
    .data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("width", d => x(d.value))
    .attr("y", d => y(d.name))
    .attr("height", y.bandwidth());

  // labels
  svg.append("g")
    .attr("fill", "black")
    .attr("text-anchor", "start")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("class", "label")
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("x", d => x(d.value) + 4)
    .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => formatDollars(d.value));

  // // add the x Axis
  // svg.append("g")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

  return svg
}

function dataUpdater(newData) {
  const data = filterYearData(newData[2018], activeFilters);

  // update axis
  y.domain(data.map(d => d.name));
  svg.select(".y-axis")
    .call(d3.axisLeft(y));

  // Make the changes
  const bars = svg.selectAll(".bar")   // change the line
    .data(data);

  // Join handles entering and exiting
  bars.join("rect")
    .transition()
    .duration(500)
    .attr("class", "bar")
    .attr("width", d => x(d.value))
    .attr("y", d => y(d.name))
    .attr("height", y.bandwidth());

  svg.selectAll(".label")
    .selectAll("text")
    .data(data)
    .join("text")
    .transition().duration(500)
    .attr("x", d => x(d.value) + 4)
    .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => formatDollars(d.value));
}
