import { apiSchedule } from './api.js';
import { displaySchedule } from './schedule.js';

const apiResults = document.getElementById('api-results');
const scheduleTab = document.getElementById('pills-schedule-tab');

scheduleTab.textContent = `${new Date().getFullYear()} Race Schedule`;

// Display Schedule
const scheduleObj = await apiSchedule();
displaySchedule(scheduleObj, apiResults);

// Display Race Results

// Display Drivers
