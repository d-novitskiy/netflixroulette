
import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_FAILURE,
  GET_MOVIES_SUCCESS,
  GET_MOVIE_REQUEST,
  GET_MOVIE_DESCRIPTION,
  SET_SORTING,
  SET_SEARCHING_VALUE,
  SET_SEARCH_BY,
} from '../actions/actions';


const initialState = {
  data: [],
  movieDescription: [],
  loading: false,
  error: null,
  total: 0,
  offset: 0,
  limit: 9,
  inputValue: '',
  searchBy: 'title',
  sortBy: 'release_date',
  sortOrder: 'desc',
};

export function moviesAppReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_REQUEST: {
      return {
        ...state,
        loading: action.loading,
        error: null,
        sorting: null,
      };
    }
    case GET_MOVIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
        total: action.total,
        offset: action.offset,
      };
    }
    case GET_MOVIES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    }
    case GET_MOVIE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case GET_MOVIE_DESCRIPTION: {
      return {
        ...state,
        loading: false,
        movieDescription: action.movieDescription,
      };
    }
    case SET_SORTING: {
      return {
        ...state,
        sortBy: action.sortBy,
      };
    }
    case SET_SEARCHING_VALUE: {
      return {
        ...state,
        inputValue: action.inputValue,
      };
    }
    case SET_SEARCH_BY: {
      return {
        ...state,
        searchBy: action.searchBy,
      };
    }
    default: return state;
  }
}
