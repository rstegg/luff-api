import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import EditProfileForm from './form'

import { editLuv, uploadLuvImage } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadLuvImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadLuvImage}>
    <Image src={image || '/luvholder.png'} />
  </Dropzone>

const EditProfile = ({ user, luv, editLuv, uploadLuvImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/luvs/edit' />
  : luv.isEdited ?
    <Redirect to='/luvs' from='/luvs/edit' />
  :
  <RootLayout>
    <Card>
      <Avatar image={luv.image} uploadLuvImage={img => uploadLuvImage(img[0], user)} />
      <Card.Content>
        <Card.Header>Editing {luv.name}</Card.Header>
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
  editLuv: (luv, user) => dispatch(editLuv(luv, user)),
  uploadLuvImage: (img, user) => dispatch(uploadLuvImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
