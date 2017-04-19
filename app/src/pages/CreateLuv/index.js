import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import CreateLuvForm from './form'

import { createLuv } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

const CreateLuv = ({ user, luv, createLuv }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/luvs/new' />
  : luv.isCreated ?
    <Redirect to='/luvs' from='/luvs/new' />
  :
  <RootLayout>
    <Card>
      <Card.Content>
        <Card.Header>New Luv</Card.Header>
        <Card.Description>
          <CreateLuvForm onSubmit={luv => createLuv(luv, user)} />
        </Card.Description>
      </Card.Content>
    </Card>
  </RootLayout>

const mapStateToProps = ({user, luvs}) =>
({
  user,
  luv: luvs.new
})

const mapDispatchToProps = dispatch =>
({
  createLuv: (luv, user) => dispatch(createLuv(luv, user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateLuv)
