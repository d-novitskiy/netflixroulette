import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { moviesAppMiddleware, openMovieMiddleware } from '../middleware';

export const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(
      moviesAppMiddleware,
      openMovieMiddleware,
    ),
  ));
