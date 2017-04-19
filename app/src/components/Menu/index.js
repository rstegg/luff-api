import React from 'react'
import { connect } from 'react-redux'
import './Menu.css'

import { Button } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const BottomNav =
({
  user,
  toLuvs,
  toPayments,
  toFeed,
  toPencil,
  toSettings,
  toPower
}) =>
  <div className='menu--container'>
    <Button basic circular onClick={toFeed} icon='globe' className='menu--button' />
    <Button basic circular onClick={toLuvs} icon='tags' className='menu--button' />
    <Button basic circular onClick={toPayments} icon='shop' className='menu--button' />
    <Button basic circular onClick={toPencil} icon='edit' className='menu--button' />
    <Button basic circular onClick={() => user.id && toSettings(user.id)} icon='setting' className='menu--button' />
    <Button basic circular onClick={toPower} icon='power' className='menu--button' />
  </div>


const mapDispatchToProps = dispatch =>
({
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
