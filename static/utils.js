// stick this on the window so I can share it
const fetchData = (filename) => {
  return fetch(filename)
    .then(data => data.json())
    .then((blob) => {
      const DATA_GLOBAL = JSON.parse(blob);
      // attach to window for debugging/testing
      window.DATA_GLOBAL = DATA_GLOBAL;
      window.DATA_HELPER = createDataHelper(DATA_GLOBAL);

      // return for other methods
      return DATA_GLOBAL;
    })
}

// for easy access everywhere else
// { 2018: { DoD: { name: "DoD", value: 12345 }, Legislative: { name: "", value: 123 }} ...}
function createDataHelper(rawData) {
  const helper = {};
  for (let key in rawData) {
    console.log()
    helper[key] = {};
    const yearData = rawData[key];
    Object.entries(yearData).map((pair) => {
      helper[key][pair[0]] = {
        name: pair[0],
        value: pair[1]
      }
    });
  }

  return helper;
}

const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatDollars = (num) => dollarFormatter.format(num).replace(".00", "");

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