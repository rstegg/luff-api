import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'

import { onLoginSubmit } from '../../redux/actions/login'

import LoginForm from './form'
import RouterButton from '../../elements/RouterButton'

import RootLayout from '../../components/layouts/Root'

const Login = ({
  user,
  onLoginSubmit
}) =>
  user.isAuthenticated ?
    <Redirect to='/luvs' from='/login' />
  :
    <RootLayout>
      <Card>
        <Card.Content>
          <Card.Header>Login</Card.Header>
          <Card.Description>
            <LoginForm onSubmit={onLoginSubmit} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to="/signup" from="/login" prefix="Don't have an account?" label="Sign up" />
        </Card.Content>
      </Card>
    </RootLayout>

const mapStateToProps = ({user}) =>
({
  user,
})

const mapDispatchToProps = dispatch =>
({
  onLoginSubmit: user => dispatch(onLoginSubmit(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
