import { fetchAPI } from './fetchEngine.js';
import { ERGAST_DEVELOPER_API } from './ergastAPI.js';

const selectRound = document.getElementById('select-round');
const roundResults = document.getElementById('round-results');
const circuitName = document.getElementById('circuit-name');

// Populate Select element
function createResultsList(scheduleArray) {
  const raceRounds = scheduleArray
    .map((schedule) => {
      return `<option value ="${schedule.round}" data-circuit="${schedule.raceName}">Season ${schedule.season} Round ${schedule.round}</option>`;
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
  if (e.target.value === 'Choose Round to View Results') {
    while (roundResults.firstElementChild) {
      circuitName.textContent = '';
      roundResults.removeChild(roundResults.firstElementChild);
    }
    return;
  }

  // get name of circuit
  const circuitOptions = document.querySelectorAll('option');
  const round = e.target.value;
  const selectedCircuit =
    circuitOptions[selectRound.selectedIndex].dataset.circuit;

  console.log(selectRound.selectedIndex);

  // display name of circuit
  circuitName.textContent = `${selectedCircuit}, Round ${round}`;

  // fetch race results

  const resultsParameter = `current/${round}/results.json`;
  const raceResults = await fetchAPI(ERGAST_DEVELOPER_API + resultsParameter);
  const resultsArray = raceResults.RaceTable.Races[0].Results;
  console.log(resultsArray);

  // create HTML and display to DOM

  const results = resultsArray
    .map((result) => {
      const driver = result.Driver.givenName + ' ' + result.Driver.familyName;
      const sponsor = result.Constructor.name;
      const driverNumber = result.Driver.permanentNumber;
      const driverFinish = result.position;
      const driverPoints = result.points;
      const driverStatus = result.status;

      let resultTime;
      let avgSpeed;

      if (result.Time) {
        resultTime = result.Time.time;
      } else {
        resultTime = 'DNF';
      }

      if (result.FastestLap) {
        avgSpeed = result.FastestLap.AverageSpeed.speed + ' kph';
      } else {
        avgSpeed = 'n/a';
      }

      return `<li class="list-group-item">
    <div class="d-flex justify-content-between align-items-center">
        <h4 class="fw-bold">
            ${driver}
            <span class="sponsor">
                Sponsor: ${sponsor} | Car: #${driverNumber}
            </span>
        </h4>
        <h6>
            Time: ${resultTime}
        </h6>
    </div>
    <table class="driver-table">
        <tr>
            <th>Finished</th>
            <th>Avg Speed</th>
            <th>Points</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>${driverFinish}</td>
            <td>${avgSpeed}</td>
            <td>${driverPoints}</td>
            <td>${driverStatus}</td>
        </tr>
    </table>
</li>`;
    })
    .join('');

  roundResults.innerHTML = results;
}

export { createResultsList };
