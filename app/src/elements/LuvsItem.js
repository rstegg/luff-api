import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const LuvsItem = ({className, onClick, luv}) =>
  <NavLink to={`/luvs/view/${luv.slug}`} className={className || 'link'}>
    <Label tag>{luv.name}</Label>
  </NavLink>
export default LuvsItem
