import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const LuvsItem = ({className, onClick, luv}) =>
  <NavLink to={`/luvs/view/${luv.slug}`} className={className || 'list--link'}>
    <Label tag color='purple'>{luv.name}</Label>
  </NavLink>

export default LuvsItem
