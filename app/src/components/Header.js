import React from 'react'
import { connect } from 'react-redux'

import { Button, Image, Menu } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'

const Header = ({user}) =>
  user.isAuthenticated ?
    <Menu fluid fixed='top'>
      <Menu.Item header>LuvPay</Menu.Item>
      <Menu.Item position='right'>
        <Button.Group>
          <NavLink to={`/profile/view/${user.id}`} from="/">
            <Button primary>
              {user.image && <Image src={user.image} alt={user.first_name} avatar /> }
              Profile
            </Button>
          </NavLink>
        </Button.Group>
      </Menu.Item>
    </Menu>
    :
    <Menu fluid fixed='top' borderless>
      <Menu.Item header>LuvPay</Menu.Item>
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
