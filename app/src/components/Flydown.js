import React from 'react'
import { connect } from 'react-redux'

import { Dropdown, Icon, Header } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const DropItem = ({onClick, icon, text}) =>
  <Header as='h2' name={text} onClick={onClick} className='dropdown--mobile__item' >
    <Icon name={icon} />
    {text}
  </Header>

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
  <Dropdown icon='content' basic button className='icon secondary'>
    <Dropdown.Menu className='dropdown--mobile'>
      {!user.isAuthenticated && <DropItem onClick={toLogin} icon='sign in' text='login'   />}
      {!user.isAuthenticated && <DropItem onClick={toSignup}  icon='add user' text='sign up'   />}
      <DropItem onClick={toFeed} text='public luv' icon='globe'   />
      {user.isAuthenticated && <DropItem onClick={toLuvs} text='your luv' icon='heart'   />}
      {user.isAuthenticated && <DropItem onClick={toPayments} text='payments' icon='shop'   />}
      <DropItem onClick={toPencil} text='start a luv' icon='edit'   />
      {user.isAuthenticated && <DropItem onClick={() => user.id && toSettings(user.id)} text='profile' icon='setting'   />}
      {user.isAuthenticated && <Dropdown.Divider   />}
      {user.isAuthenticated && <DropItem onClick={toPower}  icon='power' text='logout'   />}
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
