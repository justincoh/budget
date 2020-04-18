document.addEventListener("DOMContentLoaded", () => {
  fetchData("data/outlays_by_agency_year_keyed.json")
    .then(data => {
      makePolarAreaChartForYear(data, 2018);
      return data;
    })
});