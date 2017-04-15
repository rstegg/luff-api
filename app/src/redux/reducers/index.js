import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import feed from './feed'
import stubs from './stubs'
import payments from './payments'
import profile from './profile'

export default combineReducers({
  user,
  feed,
  stubs,
  payments,
  profile,
  form: formReducer,
  router: routerReducer
})
