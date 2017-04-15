import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const Menu =
({
  user,
  toStubs,
  toPayments,
  toFeed,
  toPencil,
  toSettings,
  toPower
}) =>
  <div className='menu'>
    <Button basic circular onClick={toFeed} icon='globe' size='massive' />
    <Button basic circular onClick={toStubs} icon='tags' size='massive' />
    <Button basic circular onClick={toPayments} icon='shop' size='massive' />
    <Button basic circular onClick={toPencil} icon='edit' size='massive' />
    <Button basic circular onClick={() => toSettings(user.id)} icon='setting' size='massive' />
    <Button basic circular onClick={toPower} icon='power' size='massive' />
  </div>

const mapDispatchToProps = dispatch =>
({
  toStubs:    () => dispatch(push('/stubs')),
  toPayments: () => dispatch(push('/payments')),
  toFeed:     () => dispatch(push('/')),
  toPencil:   () => dispatch(push('/stubs/new')),
  toSettings: userId => dispatch(push(`/profile/view/${userId}`)),
  toPower:    () => dispatch({type: 'LOGOUT'})
})

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
