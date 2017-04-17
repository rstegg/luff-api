import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import CreateStubForm from './form'

import { createStub } from '../../redux/actions/stubs'

import RootLayout from '../../components/layouts/Root'

const CreateStub = ({ user, stub, createStub }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/stubs/new' />
  : stub.isCreated ?
    <Redirect to='/stubs' from='/stubs/new' />
  :
  <RootLayout>
    <Card>
      <Card.Content>
        <Card.Header>New Stub</Card.Header>
        <Card.Description>
          <CreateStubForm onSubmit={stub => createStub(stub, user)} />
        </Card.Description>
      </Card.Content>
    </Card>
  </RootLayout>

const mapStateToProps = ({user, stubs}) =>
({
  user,
  stub: stubs.new
})

const mapDispatchToProps = dispatch =>
({
  createStub: (stub, user) => dispatch(createStub(stub, user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStub)
