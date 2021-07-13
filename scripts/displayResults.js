import { fetchAPI } from './fetchEngine.js';
import { ERGAST_DEVELOPER_API } from './ergastAPI.js';

const selectRound = document.getElementById('select-round');
const roundResults = document.getElementById('round-results');
const circuitName = document.getElementById('circuit-name');

// Populate Select element
function createResultsList(scheduleArray) {
  const raceRounds = scheduleArray
    .map((schedule) => {
      return `<option value ="${schedule.round}">Season ${schedule.season} Round ${schedule.round}</option>`;
    })
    .join('');

  selectRound.insertAdjacentHTML('beforeend', raceRounds);
}

// Event Listener for Select element
selectRound.addEventListener('change', (e) => {
  displayResults(e);
});

// Display Results
async function displayResults(e) {
  if (e.target.value === 'Choose Round to View Results') return;

  const round = e.target.value;
  const resultsParameter = `current/${round}/results.json`;

  const raceResults = await fetchAPI(ERGAST_DEVELOPER_API + resultsParameter);
  const resultsArray = raceResults.RaceTable.Races[0].Results;
  console.log(resultsArray);

  const results = resultsArray.map((result) => {
    const driver = result.Driver.givenName + ' ' + result.Driver.familyName;
    const sponsor = result.Constructor.name;
    const driverNumber = result.Driver.permanentNumber;
    const driverFinish = result.position;
    const driverPoints = result.points;
    const driverStatus = result.status;

    let resultTime;

    if (result.Time) {
      resultTime = result.Time.time;
    } else {
      resultTime = 'DNF';
    }

    console.log(
      driver,
      resultTime,
      sponsor,
      driverNumber,
      driverPoints,
      driverStatus
    );
  });
}

export { createResultsList };
