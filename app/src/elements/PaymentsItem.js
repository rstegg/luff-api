import React from 'react'
import { NavLink } from 'react-router-dom'

const LuvsItem = ({className, onClick, payment}) =>
  <NavLink to={`/payments/view/${payment.name}`} className={className || 'link'}>
    <div className={className || 'paymentlist__item'} onClick={onClick}>
      <div className='paymentlist__item--field'>{payment.name}</div>
    </div>
  </NavLink>
export default LuvsItem
