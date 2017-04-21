import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const PaymentsItem = ({className, onClick, payment}) =>
  <NavLink to={`/payments/view/${payment.name}`} className={className || 'link'}>
    <Label tag>{payment.name}</Label>
  </NavLink>

export default PaymentsItem
