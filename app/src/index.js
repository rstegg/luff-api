import 'semantic-ui-css/semantic.min.css'
import './Base.css'
import 'rxjs'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SignupSuccess from './pages/Signup/Success'
import Stubs from './pages/Stubs'
import CreateStub from './pages/CreateStub'
import ViewStub from './pages/ViewStub'
import EditStub from './pages/EditStub'
import Payments from './pages/Payments'
import CreatePayment from './pages/CreatePayment'
import ViewPayment from './pages/ViewPayment'
import EditProfile from './pages/EditProfile'
import ViewProfile from './pages/ViewProfile'
import ViewFeedStub from './pages/ViewFeedStub'

import store, { history } from './store'

render(
  <Provider store={store}>
    <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/feed/view/:id' component={ViewFeedStub} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signup/success' component={SignupSuccess} />
          <Route exact path='/stubs' component={Stubs} />
          <Route exact path='/stubs/new' component={CreateStub} />
          <Route exact path='/stubs/view/:id' component={ViewStub} />
          <Route exact path='/stubs/edit/:id' component={EditStub} />
          <Route exact path='/payments' component={Payments} />
          <Route exact path='/payments/new/:id' component={CreatePayment} />
          <Route exact path='/payments/view/:id' component={ViewPayment} />
          <Route exact path='/profile/view/:id' component={ViewProfile} />
          <Route exact path='/profile/edit' component={EditProfile} />
        </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root')
)
