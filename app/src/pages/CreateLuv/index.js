import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreateLuvForm from './form'

import { createLuv, uploadLuvImage } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadLuvImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadLuvImage}>
    <Image src={image || '/luvholder.png'} />
  </Dropzone>

const CreateLuv = ({ user, luv, createLuv, uploadLuvImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/luvs/try' from='/luvs/new' />
  : luv.isCreated ?
    <Redirect to='/luvs' from='/luvs/new' />
  :
  <RootLayout>
    <Card>
      <Avatar image={luv.image} uploadLuvImage={img => uploadLuvImage(img[0], user)} />
      <Card.Content>
        <Card.Header>New Luv</Card.Header>
        <Card.Description>
          <CreateLuvForm onSubmit={values => createLuv(({...values, image: luv.image}), user)} />
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
  uploadLuvImage: (img, user) => dispatch(uploadLuvImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateLuv)
