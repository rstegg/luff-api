import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import EditProfileForm from './form'

import { editStub } from '../../redux/actions/stubs'

import RootLayout from '../../components/layouts/Root'

const EditProfile = ({ user, stub, editStub }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/profile/edit' />
  :
  <RootLayout>
    <div className='main'>
      <Card>
        <Card.Content>
          <Card.Header>Editting Stub {stub.name}</Card.Header>
          <Card.Description>
            <EditProfileForm onSubmit={values => editStub(({...values, id: stub.id}), user)} />
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  </RootLayout>

const mapStateToProps = ({user, stubs}) =>
({
  user,
  stub: stubs.current
})

const mapDispatchToProps = dispatch =>
({
  editStub: (stub, user) => dispatch(editStub(stub, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
