const roundResults = document.getElementById('round-results');
const circuitName = document.getElementById('circuit-name');

async function removeResults() {
  // if list items exist, then remove them along with title
  if (roundResults.firstElementChild) {
    // remove title
    circuitName.textContent = '';
    // loop thru each li and remove it
    while (roundResults.firstElementChild) {
      roundResults.removeChild(roundResults.firstElementChild);
    }
    // if no list items exist, then only remove the title
  } else if (circuitName.textContent != '') {
    // remove title
    circuitName.textContent = '';
    // if error message exists, then remove
    if (document.querySelector('.no-results-message') != null) {
      document.querySelector('.no-results-message').remove();
    }
  }
}

export { removeResults };
