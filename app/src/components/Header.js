import React from 'react'
import { connect } from 'react-redux'

import { Button, Label, Menu } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'

const Header = ({user}) =>
  user.isAuthenticated ?
    <Menu fluid fixed='top'>
      <Menu.Item header>Luff</Menu.Item>
      <Menu.Item position='right'>
        <Button.Group>
          <NavLink to={`/profile/view/${user.id}`} from="/">
            <Button primary>
              {user.image && <Label image>
                <img src={user.image} alt={user.first_name} />
              </Label>}
              Profile
            </Button>
          </NavLink>
        </Button.Group>
      </Menu.Item>
    </Menu>
    :
    <Menu fluid fixed='top'>
      <Menu.Item header>Luff</Menu.Item>
      <Menu.Item position='right'>
        <Button.Group>
          <NavLink to="/login" from="/">
            <Button primary>Login</Button>
          </NavLink>
          <Button.Or />
          <NavLink to="/signup" from="/">
            <Button positive>Sign up</Button>
          </NavLink>
        </Button.Group>
      </Menu.Item>
    </Menu>

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps)(Header)
