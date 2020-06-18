export default async function getInitialState(limit) {
  const data = await fetch(`https://reactjs-cdp.herokuapp.com/movies?search=''&searchBy='title'&limit=${limit}`);
  const parsedData = await data.json();
  return parsedData;
}
