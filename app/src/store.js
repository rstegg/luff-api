import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { persistStore, autoRehydrate } from 'redux-persist'

import createHistory from 'history/createBrowserHistory'
// import createHistory from 'history/createHashHistory'

import { routerMiddleware } from 'react-router-redux'

import rootReducer from './redux/reducers'
import rootEpic from './redux/epics'

export const history = createHistory()

const epicMiddleware = createEpicMiddleware(rootEpic)
const routingMiddleware = routerMiddleware(history)

const composeEnhancers = process.env.NODE_ENV === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      routingMiddleware
    ),
    autoRehydrate()
  )
)

const persistConfig = {
  whitelist: ['user']
}

persistStore(store, persistConfig)

if(process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./redux/reducers/index', () =>
      store.replaceReducer(require('./redux/reducers/index'))
    )
  }
}

export default store
