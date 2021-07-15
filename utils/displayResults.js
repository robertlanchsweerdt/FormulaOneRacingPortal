import { fetchAPI } from './fetchEngine.js';
import { ERGAST_DEVELOPER_API } from './ergastAPI.js';
import { removeResults } from './removeResults.js';

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
    removeResults();
    return;
  }

  // get name of circuit
  const circuitOptions = document.querySelectorAll('option');
  const round = e.target.value;
  const selectedCircuit =
    circuitOptions[selectRound.selectedIndex].dataset.circuit;

  // display name of circuit
  circuitName.textContent = `${selectedCircuit}, Round ${round}`;

  // fetch race results
  const resultsParameter = `current/${round}/results.json`;
  const raceResults = await fetchAPI(ERGAST_DEVELOPER_API + resultsParameter);

  // check if race results exist from API
  // no race results indicate race did not happen or awaiting results
  if (raceResults.total === '0') {
    // remove anything displayed on screen
    removeResults();

    // display selection so user knows what they selected
    circuitName.textContent = `${selectedCircuit}, Round ${round}`;

    // create message for user about race results do not exist
    const para = document.createElement('p');
    para.classList.add('no-results-message');
    para.textContent =
      'This race has no results to share.  It is possible you are asking to view race results for a race that has not yet completed.  Please check the Schedule.';

    //add message to DOM
    circuitName.insertAdjacentElement('afterend', para);

    // ELSE if race results do exist then...
  } else {
    // if no race results message exists, then remove before displaying results
    if (document.querySelector('.no-results-message') != null) {
      document.querySelector('.no-results-message').remove();
    }

    // gather array of race results and place into a variable
    const resultsArray = raceResults.RaceTable.Races[0].Results;

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

    // display results on screen
    roundResults.innerHTML = results;
  }
}

export { createResultsList };
