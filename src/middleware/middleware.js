import { getMovies } from '../api';
import {
  GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE,
} from '../actions/actions';

export const moviesAppMiddleware = (store) => (next) => (action) => {
  if (action.type === GET_MOVIES_REQUEST) {
    getMovies(action.search, action.searchBy, action.page).then((movies) => {
      store.dispatch({
        type: GET_MOVIES_SUCCESS,
        data: movies.data,
        total: movies.total,
        offset: movies.offset,
        limit: movies.limit,
      });
    }).catch((error) => {
      store.dispatch({ type: GET_MOVIES_FAILURE, data: error.message });
    });
  }
  return next(action);
};
