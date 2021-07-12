import { ERGAST_DEVELOPER_API } from './ergastAPI.js';
import { fetchAPI } from './fetchEngine.js';
import { displaySchedule } from './displaySchedule.js';
import { displayDrivers } from './displayDrivers.js';
import { createResultsList } from './displayResults.js';

const title = document.getElementById('title');

const scheduleParameter = 'current.json';
const driversParameter = 'current/drivers.json';

// Display 2021 Schedule
const raceSchedule = await fetchAPI(ERGAST_DEVELOPER_API + scheduleParameter);
const scheduleArray = raceSchedule.RaceTable.Races;
const raceYear = scheduleArray[0].season;

title.textContent = `${raceYear} Formula One Racing Portal`;

console.log(scheduleArray);
displaySchedule(scheduleArray);

// Create Race Results List
createResultsList(scheduleArray);

// Display 2021 Drivers
const raceDrivers = await fetchAPI(ERGAST_DEVELOPER_API + driversParameter);
const driversArray = raceDrivers.DriverTable.Drivers;
displayDrivers(driversArray);
