import React from 'react'
import { connect } from 'react-redux'

import { Dropdown } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const Flydown = ({
  user,
  toLogin,
  toSignup,
  toLuvs,
  toPayments,
  toFeed,
  toPencil,
  toSettings,
  toPower
}) =>
  <Dropdown icon='content' basic button className='icon'>
    <Dropdown.Menu>
      {!user.isAuthenticated && <Dropdown.Item onClick={toLogin}  icon='sign in' text='Login' />}
      {!user.isAuthenticated && <Dropdown.Item onClick={toSignup}  icon='add user' text='Sign up' />}
      <Dropdown.Item onClick={toFeed} text='Show some Luv' icon='globe' />
      <Dropdown.Item onClick={toLuvs} text='All your Luv' icon='tags' />
      <Dropdown.Item onClick={toPayments} text='Pay with Luv' icon='shop' />
      <Dropdown.Item onClick={toPencil} text='Make a little Luv' icon='edit' />
      <Dropdown.Item onClick={() => user.id && toSettings(user.id)} text='Express some Luv' icon='setting' />
      {user.isAuthenticated && <Dropdown.Divider />}
      {user.isAuthenticated && <Dropdown.Item onClick={toPower}  icon='power' text='Luvout' />}
    </Dropdown.Menu>
  </Dropdown>

const mapDispatchToProps = dispatch =>
({
  toLogin:   () => dispatch(push('/login')),
  toSignup:  () => dispatch(push('/signup')),
  toLuvs:    () => dispatch(push('/luvs')),
  toPayments: () => dispatch(push('/payments')),
  toFeed:     () => dispatch(push('/')),
  toPencil:   () => dispatch(push('/luvs/new')),
  toSettings: userId => dispatch(push(`/profile/view/${userId}`)),
  toPower:    () => dispatch({type: 'LOGOUT'})
})

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(Flydown)
