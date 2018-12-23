import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};

const store = createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
        ),
    ),
  );

export default store;