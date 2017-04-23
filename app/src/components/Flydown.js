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
    <Dropdown.Menu className='dropdown--mobile'>
      {!user.isAuthenticated && <Dropdown.Item onClick={toLogin}  icon='sign in' text='Login'  className='dropdown--mobile__item' />}
      {!user.isAuthenticated && <Dropdown.Item onClick={toSignup}  icon='add user' text='Sign up'  className='dropdown--mobile__item' />}
      <Dropdown.Item onClick={toFeed} text='Show some Luv' icon='globe'  className='dropdown--mobile__item' />
      <Dropdown.Item onClick={toLuvs} text='All your Luv' icon='tags'  className='dropdown--mobile__item' />
      <Dropdown.Item onClick={toPayments} text='Pay with Luv' icon='shop'  className='dropdown--mobile__item' />
      <Dropdown.Item onClick={toPencil} text='Make a little Luv' icon='edit'  className='dropdown--mobile__item' />
      {user.isAuthenticated && <Dropdown.Item onClick={() => user.id && toSettings(user.id)} text='Express some Luv' icon='setting'  className='dropdown--mobile__item' />}
      {user.isAuthenticated && <Dropdown.Divider  className='dropdown--mobile__item' />}
      {user.isAuthenticated && <Dropdown.Item onClick={toPower}  icon='power' text='Luvout'  className='dropdown--mobile__item' />}
    </Dropdown.Menu>
  </Dropdown>

const mapStateToProps = ({user}) =>
({
  user
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Flydown)
