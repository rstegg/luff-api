import { applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createOfflineStore } from 'redux-offline'
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

const initialState = {
  user: {
    id: null,
    token: '',
    isAuthenticated: false,
    image: ''
  }
}

const store = createOfflineStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(epicMiddleware, routingMiddleware)
  ),
  offlineConfig
)

if (module.hot) {
  module.hot.accept('./redux/reducers/index', () => {
    const reducer = require('./redux/reducers/index')
    store.replaceReducer(reducer)
  })
}

export default store
