import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'

import { resetSignup } from '../../../redux/actions/signup'
import { createLuv } from '../../../redux/actions/luvs'

import RouterButton from '../../../elements/RouterButton'

import RootLayout from '../../../components/layouts/Root'

class SignupSuccess extends Component {
  componentWillMount() {
    this.props.resetSignup()
    if(this.props.luv) {
      this.props.createLuv(this.props.luv, this.props.user)
    }
  }
  render() {
    const { user } = this.props
    if(user.isAuthenticated) {
      return <Redirect to='/luvs' from='/signup/success' />
    }
    return (
      <RootLayout>
        <Card>
          <Card.Content>
            <Card.Header>Signup Successful!</Card.Header>
            <Card.Description>
              Please check your email for verification.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <RouterButton to="/login" from="/signup/success" prefix="Have an account?" label="Login" />
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({user, luvs}) =>
({
  user,
  luv: luvs.free
})

const mapDispatchToProps = dispatch =>
({
  resetSignup: () => dispatch(resetSignup()),
  createLuv: (luv, user) => dispatch(createLuv(luv, user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupSuccess)
