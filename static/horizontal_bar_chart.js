document.addEventListener("DOMContentLoaded", () => {
  fetchData("data/outlays_by_agency_year_keyed.json")
    .then(data => horizontalBarChart(data, 2018));
});

// https://bl.ocks.org/caravinden/eb0e5a2b38c8815919290fa838c6b63b
function horizontalBarChart(fullData, year) {
  const yearData = fullData[year];

  let data = [];
  // format to { name: namestr, value: int} for ease of use
  Object.entries(yearData).map((pair) => {
    data.push({ name: pair[0], value: pair[1] });
  });

  //sort bars based on value
  data.sort(function (a, b) { return d3.descending(a.value, b.value); });
  data = data.filter(obj => obj.value >= 0);

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  const margin = { top: 15, right: 25, bottom: 15, left: 60 };
  const width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  const y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1)
    .domain(data.map(d => d.name));

  const x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(data, d => d.value)]);

  const svg = d3.select(".horizontal-bar-chart")
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

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
}

/*
function horizontalBarChart(fullData, year) {
  const yearData = fullData[year];

  let data = [];
  // format to { name: namestr, value: int} for ease of use
  Object.entries(yearData).map((pair) => {
    data.push({ name: pair[0], value: pair[1] });
  });

  //sort bars based on value
  data.sort(function (a, b) {
    return d3.descending(a.value, b.value);
  })

  data = data.filter(obj => obj.value >= 0);

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  const margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 60
  };

  const width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const svg = d3.select(".horizontal-bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleLinear()
    .range([0, width])
    .domain([0, data[0].value]); // because it's already sorted

  // const y = d3.scaleOrdinal()
  //   .range([0, height])
    // .domain([data.map(d => d.name), 0])

  const y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)
  debugger;
  // create y axis
  svg.append("g")
    .call(d3.axisLeft(y))
    // .tickSize(0)
    // .orient("left")
    // .attr("class", "y axis")

  //make y axis to show bar names
  // var yAxis = d3.svg.axis()
  //   .scale(y)
  //   //no tick marks
  //   .tickSize(0)
  //   .orient("left");

  // var gy = svg.append("g")
  //   .attr("class", "y axis")
  //   .call(yAxis)

  var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

  //append rects
  bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return y(d.name);
    })
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", function (d) {
        return x(d.value);
    });

  //add a value label to the right of each bar
  bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return y(d.name) + y.bandwidth() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return x(d.value) + 3;
    })
    .text(function (d) {
        return d.value;
    });
}
*/