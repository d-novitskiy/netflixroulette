import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Switch, Route } from 'react-router-dom';
import {
  GET_MOVIES_REQUEST,
  GET_MOVIE_DESCRIPTION,
  CLOSE_MOVIE_DESCRIPTION,
  SET_SORTING,
} from './actions/actions';
import {
  Header, StatusBar, Body, Movie, Footer, Pagination, MovieDescription, SelectMoviesPerPage,
} from './components';
import { getMovieDescription } from './api/getMovieDescription';


function App() {
  const {
    data, total, loading, movieDescription, openModal,
  } = useSelector((state) => state.moviesApp);
  const [sorting, setSorting] = useState();
  const [search, setSearch] = useState('title');
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(9);
  const dispatch = useDispatch();

  function onSortClick(value) {
    if (value === 'date') {
      setSorting(value);
      data.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateA - dateB;
      });
      dispatch({
        type: SET_SORTING,
        data,
      });
    } else if (value === 'rating') {
      setSorting(value);
      data.sort((a, b) => b.vote_average - a.vote_average);
      dispatch({
        type: SET_SORTING,
        data,
      });
    }
  }
  // function getInitialState() {
  //   getInitialState(moviesPerPage).then((movies) => {
  //     dispatch({
  //       type: GET_INITIAL_STATE,
  //       data: movies.data,
  //     });
  //   });
  // }
  function getMovies(e) {
    e.preventDefault();
    setSorting('');
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
    <Switch>
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
        <StatusBar
          active={sorting}
          onSortClick={onSortClick}
          select={(
            <SelectMoviesPerPage
              value={moviesPerPage}
              onSelectChange={setMoviesPerPage}
            />
      )}
        >
          {`${total} 
          movies found`}
        </StatusBar>
        <Body>
          { currentMovies.length === 0 ? <div className="emptyBody">Search your movie</div>
            : currentMovies.map((item) => {
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
                  rating={item.vote_average}
                />
              );
            })}
        </Body>
        <Pagination
          moviesPerPage={moviesPerPage}
          total={total}
          paginate={paginate}
        />
        <Footer siteName="netflixroulette" />
        <div className="loader" style={{ visibility: `${loading ? 'visible' : 'hidden'}`, zIndex: `${loading ? '1' : '-1'}` }}>
          <div className="loader_inner">
            <Loader color="#f65064" type="Bars" visible={loading} />
          </div>
        </div>
        <Route path={data.id}>
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
        </Route>
      </div>
    </Switch>
  );
}

export default App;
