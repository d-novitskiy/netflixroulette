export async function getMovies(search, searchBy, page) {
  const data = await fetch(`https://reactjs-cdp.herokuapp.com/movies?search=${search}&searchBy=${searchBy}&offset=${page}&limit=3000`);
  const parsedData = await data.json();
  return parsedData;
}
