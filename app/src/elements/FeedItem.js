import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const StubsItem = ({className, onClick, stub}) =>
  <NavLink to={`/feed/view/${stub.slug}`} className={className || 'link'}>
    <Label tag>{stub.name}</Label>
  </NavLink>
export default StubsItem
