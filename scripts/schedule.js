function displaySchedule(scheduleObj, apiResults) {
  console.log(scheduleObj);

  const accordionItems = scheduleObj.map((schedule, index) => {
    const {
      date,
      time,
      raceName,
      Circuit: {
        Location: { locality, country },
      },
      url,
    } = schedule;

    const raceYear = date.substr(0, 4);
    const raceMonth = date.substr(5, 2);
    const raceDay = date.substr(8);

    const concateFullDate = new Date(date + 'T' + time);
    // console.log(concateFullDate);

    // console.log('Race Month:', raceMonth);
    // console.log('Race Day:', raceDay);

    // const newDate = new Date(date);
    // const longMonth = getLongMonth(newDate);

    // console.log('UTC string:  ' + concateFullDate.toUTCString());
    // console.log('Local string:  ' + concateFullDate.toString());
    // console.log('Hours local:  ' + concateFullDate.getHours());
    // console.log('Hours UTC:   ' + concateFullDate.getUTCHours());

    const localTime = concateFullDate.toString();
    console.log(localTime.split(' '));
    console.log(localTime.split(' ')[4].substr(0, 5) + localTime.split(' ')[6]);

    // console.log(
    //   'Month:   ' +
    //     new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate)
    // );

    // console.log(longMonth);

    return `<tr>
      <td>2021-03-28</td>
      <td>15:00:00Z</td>
      <td><a href="https://en.wikipedia.org/wiki/2021_Bahrain_Grand_Prix"
              target="_blank">Romanga Grand Prix</a></td>
      <td>Imola</td>
      <td>USA</td>
  </tr>`;
  });

  apiResults.insertAdjacentHTML('beforeend', accordionItems.join(''));
}

export { displaySchedule };
