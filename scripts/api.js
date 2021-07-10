const RACE_SCHEDULE_API = 'https://ergast.com/api/f1/current.json';

async function apiSchedule() {
  const resp = await fetch(RACE_SCHEDULE_API);
  const data = await resp.json();
  const scheduleObj = data.MRData.RaceTable.Races;
  return scheduleObj;
}

export { apiSchedule };
