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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

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

persistStore(store)

if (module.hot) {
  module.hot.accept('./redux/reducers/index', () => {
    const reducer = require('./redux/reducers/index')
    store.replaceReducer(reducer)
  })
}

export default store
