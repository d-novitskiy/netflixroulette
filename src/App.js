import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { GET_MOVIES_REQUEST, GET_MOVIE_DESCRIPTION, CLOSE_MOVIE_DESCRIPTION } from './actions/actions';
import {
  Header, StatusBar, Body, Movie, Footer, Pagination, MovieDescription,
} from './components';
import { getMovieDescription } from './api/getMovieDescription';


function App() {
  const {
    data, total, loading, movieDescription, openModal,
  } = useSelector((state) => state.moviesApp);
  const [search, setSearch] = useState('title');
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(9);
  const dispatch = useDispatch();
  function getMovies(e) {
    e.preventDefault();
    setInputValue('');
    if (inputValue === '') {
      return;
    }
    dispatch({
      type: GET_MOVIES_REQUEST, search: inputValue.toLowerCase(), searchBy: search,
    });
  }
  function openMovie(id) {
    getMovieDescription(id).then((movie) => {
      dispatch({
        type: GET_MOVIE_DESCRIPTION,
        movieDescription: movie,
      });
    });
  }
  function closeModal() {
    dispatch({
      type: CLOSE_MOVIE_DESCRIPTION,
    });
  }
  function paginate(pageNumber) {
    setPage(pageNumber);
  }
  const last = page * moviesPerPage;
  const first = last - moviesPerPage;
  const currentMovies = data.slice(first, last);
  return (

    <div className="wrapper">
      <Header
        siteName="netflixroulette"
        value={inputValue}
        search={search}
        onChange={setInputValue}
        onSearchByClick={setSearch}
        onSearchClick={getMovies}
        placeholder="Type to find a movie"
        onSubmit={getMovies}
      />
      <StatusBar>
        {`${total} 
          movies found`}
      </StatusBar>
      <Pagination page={page} moviesPerPage={moviesPerPage} total={total} paginate={paginate} />
      <Body>
        {currentMovies.map((item) => {
          const year = new Date(item.release_date);
          return (
            <Movie
              key={item.id}
              poster={item.poster_path}
              title={item.title}
              onMovieClick={openMovie}
              onError={(e) => e.target.src = 'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg'}
              genres={item.genres.join(', ')}
              year={year.getFullYear()}
              id={item.id}
            />
          );
        })}
      </Body>
      <Pagination moviesPerPage={moviesPerPage} total={total} paginate={paginate} />


      <Footer siteName="netflixroulette" />
      <div className="loader" style={{ visibility: `${loading ? 'visible' : 'hidden'}`, zIndex: `${loading ? '1' : '-1'}` }}>
        <div className="loader_inner">
          <Loader color="#f65064" type="Bars" visible={loading} />
        </div>
      </div>
      <MovieDescription
        title={movieDescription.title}
        genres={movieDescription.genres === undefined ? '' : movieDescription.genres.join(', ')}
        description={movieDescription.overview}
        popularity={movieDescription.vote_average}
        budget={movieDescription.budget}
        img={movieDescription.poster_path}
        openModal={openModal}
        onCloseModal={closeModal}
      />
    </div>
  );
}

export default App;
