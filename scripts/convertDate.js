function convertDate(date, time) {
  const concateFullDate = new Date(date + 'T' + time);
  const dateString = concateFullDate.toString();

  const localDate = dateString.substr(0, 15);
  return localDate;

  //   console.log('UTC string:  ' + concateFullDate.toUTCString());
  //   console.log('Local string:  ' + concateFullDate.toString());
  //   console.log('Hours local:  ' + concateFullDate.getHours());
  //   console.log('Hours UTC:   ' + concateFullDate.getUTCHours());
}

export { convertDate };
