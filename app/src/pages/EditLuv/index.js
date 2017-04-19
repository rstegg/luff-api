import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import EditProfileForm from './form'

import { editLuv } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

const EditProfile = ({ user, luv, editLuv }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/profile/edit' />
  :
  <RootLayout>
    <Card>
      <Card.Content>
        <Card.Header>Editting Luv {luv.name}</Card.Header>
        <Card.Description>
          <EditProfileForm onSubmit={values => editLuv(({...values, id: luv.id}), user)} />
        </Card.Description>
      </Card.Content>
    </Card>
  </RootLayout>

const mapStateToProps = ({user, luvs}) =>
({
  user,
  luv: luvs.current
})

const mapDispatchToProps = dispatch =>
({
  editLuv: (luv, user) => dispatch(editLuv(luv, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
