document.addEventListener("DOMContentLoaded", () => {
  addTestHandler();
});

function addTestHandler() {
  const testButton = document.querySelector("#test-button");
  let index = 0;
  const maxIndex = 35;

  testButton.addEventListener("click", () => {
    activeFilters.push(ALL_CATEGORIES[index]);
    dataUpdater(DATA_GLOBAL);
    if (index < maxIndex) { index += 1; }
  });
}