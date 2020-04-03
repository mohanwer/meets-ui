import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {  History  } from 'history';

export const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history)
})

export const configureStore = (history: History, preloadedState?: any) =>
{
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  )
};