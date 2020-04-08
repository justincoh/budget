function makeChart (data) {
  const one = data["Total outlays"]; // for dev

  const ctx = document.getElementById("chart");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(one),
      datasets: [{
      label: "Test dataset",
        backgroundColor: "rgb(143, 0, 143)",
        data: Object.values(one),
      }],
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
