import { combineReducers } from 'redux';
import { moviesAppReducer } from '../reducers';

export const rootReducer = combineReducers({
  moviesApp: moviesAppReducer,
});
