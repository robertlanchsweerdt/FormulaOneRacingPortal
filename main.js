import { ERGAST_DEVELOPER_API } from './utils/ergastAPI.js';
import { fetchAPI } from './utils/fetchEngine.js';
import { displaySchedule } from './utils/displaySchedule.js';
import { displayDrivers } from './utils/displayDrivers.js';
import { createResultsList } from './utils/displayResults.js';

const title = document.getElementById('title');

// Display 2021 Schedule
const scheduleParameter = 'current.json';
const raceSchedule = await fetchAPI(ERGAST_DEVELOPER_API + scheduleParameter);
const scheduleArray = raceSchedule.RaceTable.Races;
const raceYear = scheduleArray[0].season;

title.textContent = `${raceYear} Formula One Racing Portal`;

displaySchedule(scheduleArray);

// Create Race Results List
createResultsList(scheduleArray);

// Display Current Drivers
const driversParameter = 'current/drivers.json';
const raceDrivers = await fetchAPI(ERGAST_DEVELOPER_API + driversParameter);
const driversArray = raceDrivers.DriverTable.Drivers;
displayDrivers(driversArray);
