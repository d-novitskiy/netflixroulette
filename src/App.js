import React, { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Switch, Route } from 'react-router-dom';
import {
  GET_MOVIES_REQUEST,
  SET_SORTING,
  GET_MOVIE_REQUEST,
  SET_SEARCHING_VALUE,
  SET_SEARCH_BY,
} from './actions/actions';
import {
  Header, StatusBar, Body, Movie, Footer, Pagination, MovieDescription, SelectMoviesPerPage,
} from './components';

function App() {
  // redux-data
  const {
    data, total, loading, movieDescription, sortBy, searchBy,
  } = useSelector((state) => state.moviesApp);

  const dispatch = useDispatch();

  // useState
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(9);

  // set initial state
  useEffect(() => {
    dispatch({
      type: GET_MOVIES_REQUEST,
      loading: true,
      offset: 0,
      limit: moviesPerPage,
    });
  }, []);

  // sortBy
  function onSortClick(value) {
    dispatch({
      type: SET_SORTING,
      sortBy: value,
    });
    dispatch({
      type: GET_MOVIES_REQUEST,
      offset: (page - 1) * moviesPerPage,
      limit: moviesPerPage,
    });
  }

  // onSearchClick
  function getMovies(e) {
    e.preventDefault();
    setPage(1);
    setInputValue('');
    if (inputValue === '') {
      return;
    }
    dispatch({
      type: SET_SEARCHING_VALUE,
      inputValue: inputValue.toLowerCase(),
      searchBy,
    });
    dispatch({
      type: GET_MOVIES_REQUEST,
      offset: 0,
      limit: moviesPerPage,
      loading: true,
    });
  }

  // Open choosen movie with React Router
  function openMovie(id) {
    dispatch({
      type: GET_MOVIE_REQUEST,
      id,
    });
  }

  // pagination
  function paginate(pageNumber) {
    setPage(pageNumber);
    dispatch({
      type: GET_MOVIES_REQUEST,
      loading: false,
      offset: (pageNumber - 1) * moviesPerPage,
      limit: moviesPerPage,
    });
  }
  function changeActivePage(leftBorderNumber) {
    setPage(leftBorderNumber);
    dispatch({
      type: GET_MOVIES_REQUEST,
      offset: (leftBorderNumber - 1) * moviesPerPage,
      limit: moviesPerPage,
    });
  }

  // change amount of movies shown on the screen
  function onSelectChange(value) {
    setMoviesPerPage(value);
    dispatch({
      type: GET_MOVIES_REQUEST,
      offset: (page - 1) * value,
      limit: value,
    });
  }

  // change search by
  function onSearchByClick(search) {
    dispatch({
      type: SET_SEARCH_BY,
      searchBy: search,
    });
  }
  return (
    <Switch>
      <div className="wrapper">
        <Header
          siteName="netflixroulette"
          value={inputValue}
          searchBy={searchBy}
          onChange={setInputValue}
          onSearchByClick={onSearchByClick}
          onSearchClick={getMovies}
          placeholder="Type to find a movie"
          onSubmit={getMovies}
        />
        <StatusBar
          active={sortBy}
          onSortClick={onSortClick}
          select={(
            <SelectMoviesPerPage
              value={moviesPerPage}
              onSelectChange={onSelectChange}
            />
      )}
        >
          {`${total} 
          movies found`}
        </StatusBar>
        <Body>
          { data.length === 0 ? <div className="emptyBody">Find your movie</div>
            : data.map((item) => {
              const year = new Date(item.release_date);
              return (
                <Movie
                  key={item.id}
                  poster={item.poster_path}
                  title={item.title}
                  onError={(e) => (e.target.src = 'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg')}
                  genres={item.genres.join(', ')}
                  year={year.getFullYear()}
                  id={item.id}
                  rating={item.vote_average}
                />
              );
            })}
        </Body>
        <Pagination
          moviesPerPage={moviesPerPage}
          total={total}
          paginate={paginate}
          changeActivePage={changeActivePage}
          currentPage={page}
        />
        <Footer siteName="netflixroulette" />
        <div className="loader" style={{ visibility: `${loading ? 'visible' : 'hidden'}`, zIndex: `${loading ? '1' : '-1'}` }}>
          <div className="loader_inner">
            <Loader color="#f65064" type="Bars" visible={loading} />
          </div>
        </div>
        <Route path="/movies/:id">
          <MovieDescription
            style={{ visibility: `${!loading ? 'visible' : 'hidden'}` }}
            title={movieDescription.title}
            genres={movieDescription.genres === undefined ? '' : movieDescription.genres.join(', ')}
            description={movieDescription.overview}
            popularity={movieDescription.vote_average}
            budget={movieDescription.budget}
            img={movieDescription.poster_path}
            displayDescription={openMovie}
          />
        </Route>
      </div>
    </Switch>
  );
}

export default App;
