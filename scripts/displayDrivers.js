const driverOutput = document.querySelector('#display-driver');

// DISPLAY DRIVERS
async function displayDrivers(driversArray) {
  // Promise.all() is used with the map() method when a
  // Promise is used within the map() loop and the multiple Promises
  // must fully resolve
  const drivers = Promise.all(
    // needed to set-up an async within call back function because
    // a Promise exists within the loop to fetch the photo
    // for each driver
    driversArray.map(async function (driver) {
      const {
        dateOfBirth,
        givenName: first,
        familyName: last,
        permanentNumber: raceNumber,
        nationality,
        url,
      } = driver;

      // varible contains full name of driver
      const driverName = `${driver.givenName} ${driver.familyName}`;

      // find driver photo
      // findPhoto() returns a promise to fetch photo from local JSON
      const driverUrl = await findPhoto(driverName);

      // data manipulation to display date of birth
      // as MMM-dd-yyyy (instead of the default yyyy-dd-mm)
      const birth = new Date(dateOfBirth).toString().split(' ');
      const birthDay = `${birth[1]} ${birth[2]}, ${birth[3]}`;

      // create a card for each driver
      return `<div class="col-lg-4 mb-3">
      <div class="card">
        <div class="img-wrapper">
            <img src="${driverUrl}" class="card-img-top" alt="${driverName}">
        </div>
          <div class="card-body">
              <h5 class="card-title">${driverName}</h5>
              <p class="card-text">Driving the #${raceNumber} car, ${first} is of ${nationality} nationality with a birthdate of ${birthDay}. </p>
              <a href="${url}" class="btn btn-primary" target="_blank" rel="noopener">LEARN MORE</a>
          </div>
      </div>
    </div>`;
    })
  );

  // need to await() the variable "drivers" because the map() loop is
  // returning a promise of driver photo within the map()
  // without await(), then variable "drivers" returns an Object
  // instead of an array (which is what map() returns)
  const htmlCard = (await drivers).join('');

  // display driver info and photo on screen
  driverOutput.innerHTML = htmlCard;
}

// FIND DRIVER PHOTO
async function findPhoto(driverName) {
  // fetch request to local JSON
  const res = await fetch('./assets/driverPhotos.json');
  const data = await res.json();

  // conditional to find driver name match with JSON key
  if (data.hasOwnProperty(driverName.toLowerCase())) {
    return data[driverName.toLowerCase()];
  } else {
    console.log('no image found');
  }
}

export { displayDrivers };
