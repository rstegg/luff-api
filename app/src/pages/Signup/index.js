import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'

import { onSignupSubmit } from '../../redux/actions/signup'

import SignupForm from './form'
import RouterButton from '../../elements/RouterButton'

import RootLayout from '../../components/layouts/Root'

const Signup = ({
  user,
  onSignupSubmit
}) =>
  user.isAuthenticated ?
    <Redirect to='/luvs' from='/signup' />
  : user.isRegistered ?
    <Redirect to='/signup/success' from='/signup' />
  :
    <RootLayout>
      <Card>
        <Card.Content>
          <Card.Header>Signup</Card.Header>
          <Card.Description>
            <SignupForm onSubmit={onSignupSubmit} isLoading={user.isLoading} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to="/login" from="/signup" prefix="Have an account?" label="Login" />
        </Card.Content>
      </Card>
    </RootLayout>

const mapStateToProps = ({user}) =>
({
  user,
})

const mapDispatchToProps = dispatch =>
({
  onSignupSubmit: user => dispatch(onSignupSubmit(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
