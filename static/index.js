document.addEventListener("DOMContentLoaded", () => {
  fetch("data/outlays_by_agency_dept_keyed.json")
    .then(data => data.json())
    .then(data => console.log(data));
});
