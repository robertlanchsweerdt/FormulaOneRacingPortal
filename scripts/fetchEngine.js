async function fetchAPI(api) {
  try {
    const resp = await fetch(api);
    const data = await resp.json();
    const fetchData = data.MRData;
    return fetchData;
  } catch (err) {
    console.error(err);
  }
}

export { fetchAPI };
