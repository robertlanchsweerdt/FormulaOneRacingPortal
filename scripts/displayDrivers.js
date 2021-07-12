const output = document.querySelector('#display-driver');

async function displayDrivers(driversArray) {
  const drivers = Promise.all(
    driversArray.map(async function (driver) {
      const {
        driverId,
        givenName: first,
        familyName: last,
        permanentNumber: raceNumber,
        nationality,
        url,
      } = driver;

      const driverName = `${driver.givenName} ${driver.familyName}`;

      const driverUrl = await findPhoto(driverName);
      return `<div class="col-lg-4 mb-3">
      <div class="card">
        <div class="img-wrapper">
            <img src="${driverUrl}" class="card-img-top" alt="${driverName}">
        </div>
          <div class="card-body">
              <h5 class="card-title">${driverName}</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional
                  content.</p>
              <a href="${url}" class="btn btn-primary" target="_blank" rel="noopener">LEARN MORE</a>
          </div>
      </div>
    </div>`;
    })
  );

  const htmlCard = (await drivers).join('');
  output.innerHTML = htmlCard;
}

// find photo
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
