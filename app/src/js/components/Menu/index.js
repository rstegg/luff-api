import React from 'react'
import { connect } from 'react-redux'

import { Button, Popup } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const BottomNav =
({
  isMobile,
  isTablet,
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
  !isMobile && (
    isTablet ?
    <div>
      <div className='menu--container--left'>
        <Popup position='top center' trigger={<Button basic circular onClick={toFeed} icon='globe' size='massive' className='menu--button' />} content='public luv' />
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toFreePencil} icon='edit' size='massive' className='menu--button' />} content='start a luv' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLuvs} icon='heart' size='massive' className='menu--button' />} content='your luvs' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPayments} icon='shop' size='massive' className='menu--button' />} content='payments' />}
      </div>
      <div className='menu--container--right'>
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLogin} icon='sign in' size='massive' className='menu--button' />} content='login' />}
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toSignup} icon='add user' size='massive' className='menu--button' />} content='sign up' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPencil} icon='edit' size='massive' className='menu--button' />} content='start a luv' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={() => user.username && toSettings(user.username)} icon='setting' size='massive' className='menu--button' />} content='profile' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPower} icon='power' size='massive' className='menu--button' />} content='logout' />}
      </div>
    </div>
    :
    <div>
      <div className='menu--container'>
        <Popup position='top center' trigger={<Button basic circular onClick={toFeed} icon='globe' size='massive' className='menu--button' />} content='public luv' />
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toFreePencil} icon='edit' size='massive' className='menu--button' />} content='start a luv' />}
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLogin} icon='sign in' size='massive' className='menu--button' />} content='login' />}
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toSignup} icon='add user' size='massive' className='menu--button' />} content='sign up' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLuvs} icon='heart' size='massive' className='menu--button' />} content='your luvs' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPayments} icon='shop' size='massive' className='menu--button' />} content='payments' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPencil} icon='edit' size='massive' className='menu--button' />} content='start a luv' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={() => user.username && toSettings(user.username)} icon='setting' size='massive' className='menu--button' />} content='profile' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPower} icon='power' size='massive' className='menu--button' />} content='logout' />}
      </div>
    </div>
  )


const mapDispatchToProps = dispatch =>
({
  toLogin:    () => dispatch(push('/login')),
  toSignup:    () => dispatch(push('/signup')),
  toLuvs:    () => dispatch(push('/luvs')),
  toPayments: () => dispatch(push('/payments')),
  toFeed:     () => dispatch(push('/')),
  toPencil:   () => dispatch(push('/luvs/new')),
  toFreePencil:   () => dispatch(push('/luvs/try')),
  toSettings: username => dispatch(push(`/user/${username}`)),
  toPower:    () => dispatch({type: 'LOGOUT'})
})

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
