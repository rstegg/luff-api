import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import feed from './feed'
import luvs from './luvs'
import payments from './payments'
import profile from './profile'

export default combineReducers({
  user,
  feed,
  luvs,
  payments,
  profile,
  form: formReducer,
  router: routerReducer
})
