export async function getMovieDescription(movieId) {
  const data = await fetch(`https://reactjs-cdp.herokuapp.com/movies/${movieId}`);
  const movieDescription = await data.json();
  return movieDescription;
}
