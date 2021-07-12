import { fetchAPI } from './fetchEngine.js';
import { ERGAST_DEVELOPER_API } from './ergastAPI.js';

const selectRound = document.getElementById('select-round');
const roundResults = document.getElementById('round-results');

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

  //   const results = resultsArray((result) => {

  //   })
}

export { createResultsList };
