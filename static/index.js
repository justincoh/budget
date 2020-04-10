function getRandomColor () { return '#'+Math.floor(Math.random()*16777215).toString(16); }
// relies on data being global
function generateDataset (key) {
  return {
    label: key,
    fill: false,
    backgroundColor: randomColor,
    borderColor: randomColor,
    data: Object.values(data[key]),
  }
}

const DEPARTMENTS = [
  "Department of Defense--Military Programs",
  "Department of Education",
  "Department of Homeland Security",
  "National Aeronautics and Space Administration",
];

function makeChart (data) {
  const one = data["Total outlays"]; // for dev

  const ctx = document.getElementById("chart");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(one),
      datasets: DEPARTMENTS.map(dep => generateDataset(dep)),
    },
    options: {
      responsive: true,
      // scales: {
      //   x: {
      //     display: true,
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'X Label'
      //     }
      //   },
      //   y: {
      //     display: true,
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Y Label'
      //     }
      //   }
      // }
    },
  });
}

function generateBarData (yearData, key) {
  return {
    barPercentage: 1,
    categoryPercentage: 1,
    backgroundColor: getRandomColor(),
    data: [yearData[key]],
    label: key,
  };
}

// why does Chartjs assume bar chart data is going to be time series?
// That's not the point of bar charts
// I think D3 is probably a better choice for that one :(
function makeBarChartForYear(data) {

}

function makePolarAreaChartForYear(data) {
  const ctx = document.getElementById("chart");
  const yearData = data["2018"];
  // filter to get e.g. { "Department of Education": 12345}
  // const barData = DEPARTMENTS.map(dept => yearData[dept]);
  return new Chart(ctx, {
    type: "polarArea",
    data: {
      datasets: [{
        data: DEPARTMENTS.map(dep => yearData[dep]),
        backgroundColor: DEPARTMENTS.map(() => getRandomColor()),
      }],
      labels: DEPARTMENTS,
    },
    options: {
      responsive: true,
			title: {
				display: true,
				text: "Testing a Polar Chart",
			},
		}
  });
}

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
      window.data = data;
      makeBarChartForYear(data);
    });
});
