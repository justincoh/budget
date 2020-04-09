// relies on data being global
function generateDataset (key) {
  const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  return {
    label: key,
    fill: false,
    backgroundColor: randomColor,
    borderColor: randomColor,
    data: Object.values(data[key]),
  }
}

const depts = [
  // "Department of Defense--Military Programs",
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
      datasets: depts.map(dep => generateDataset(dep)),
      // datasets: [{
      //   label: "Test dataset",
      //   fill: false,
      //   backgroundColor: "purple",
      //   borderColor: "purple",
      //   data: Object.values(one),
      // }],
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
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/outlays_by_agency_dept_keyed.json")
    .then(data => data.json())
    .then((blob) => {
      const data = JSON.parse(blob);
      window.data = data;
      makeChart(data);
    });
});
