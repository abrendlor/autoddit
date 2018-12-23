import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import autodditsReducer from "./autodditsReducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  autodditsReducer
});
