export async function getMovies(search, searchBy, offset, limit, sortBy, sortOrder) {
  const data = await fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}&searchBy=${searchBy}&offset=${offset}&limit=${limit}`);
  const parsedData = await data.json();
  return parsedData;
}
