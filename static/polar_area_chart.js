function makePolarAreaChartForYear(data, year) {
  const ctx = document.getElementById("chart");
  const yearData = data[year];
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