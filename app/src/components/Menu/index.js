import React from 'react'
import { connect } from 'react-redux'
import './Menu.css'

import { Button, Popup } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const BottomNav =
({
  isMobile,
  user,
  toLogin,
  toSignup,
  toLuvs,
  toPayments,
  toFeed,
  toPencil,
  toFreePencil,
  toSettings,
  toPower
}) =>
  !isMobile &&
  <div>
    <div className='menu--container'>
      <Popup position='top center' trigger={<Button basic circular onClick={toFeed} icon='globe' size='massive' className='menu--button' />} content='public luv' />
      {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toFreePencil} icon='edit' size='massive' className='menu--button' />} content='make a luv' />}
      {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLogin} icon='sign in' size='massive' className='menu--button' />} content='login' />}
      {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toSignup} icon='user circle' size='massive' className='menu--button' />} content='sign up' />}
      {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLuvs} icon='heart' size='massive' className='menu--button' />} content='your luvs' />}
      {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPayments} icon='shop' size='massive' className='menu--button' />} content='payments' />}
      {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPencil} icon='edit' size='massive' className='menu--button' />} content='make a luv' />}
      {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={() => user.id && toSettings(user.id)} icon='setting' size='massive' className='menu--button' />} content='profile' />}
      {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPower} icon='power' size='massive' className='menu--button' />} content='logout' />}
    </div>
  </div>


const mapDispatchToProps = dispatch =>
({
  toLogin:    () => dispatch(push('/login')),
  toSignup:    () => dispatch(push('/signup')),
  toLuvs:    () => dispatch(push('/luvs')),
  toPayments: () => dispatch(push('/payments')),
  toFeed:     () => dispatch(push('/')),
  toPencil:   () => dispatch(push('/luvs/new')),
  toFreePencil:   () => dispatch(push('/luvs/try')),
  toSettings: userId => dispatch(push(`/profile/view/${userId}`)),
  toPower:    () => dispatch({type: 'LOGOUT'})
})

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
