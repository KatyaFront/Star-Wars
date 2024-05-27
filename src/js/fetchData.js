// асинхронная функция получения данных из api (один url-адрес)
async function fetchData(url) {
  let results = [];
  let page = 1;
  let nextPage = true;

  while (nextPage) {
    try {
      const response = await fetch(`${url}?page=${page}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      results = [...results, ...data.results];

      nextPage = data.next !== null;
      page++;
    } catch (error) {
      console.error('Error fetching data:', error);
      nextPage = false;
    }
  }
  return results;
}

// aсинхронная функция получения всех данных из api (всех url-адресов)
export async function fetchAllData(urls) {
  try {
    const results = await Promise.all(urls.map((url) => fetchData(url)));
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
