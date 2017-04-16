import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { offline } from 'redux-offline'
import offlineConfig from 'redux-offline/lib/defaults'

import createHistory from 'history/createBrowserHistory'
// import createHistory from 'history/createHashHistory'

import { routerMiddleware } from 'react-router-redux'

import rootReducer from './redux/reducers'
import rootEpic from './redux/epics'

export const history = createHistory()

const epicMiddleware = createEpicMiddleware(rootEpic)
const routingMiddleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composeEnhancers(applyMiddleware(epicMiddleware, routingMiddleware), offline(offlineConfig))

const createStoreWithMiddleware = enhancers(createStore)

const store = createStoreWithMiddleware(rootReducer)


if (module.hot) {
  module.hot.accept('./redux/reducers/index', () => {
    const reducer = require('./redux/reducers/index')
    store.replaceReducer(reducer)
  })
}

export default store
