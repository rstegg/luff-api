import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreateFreeLuvForm from './form'

import { saveFreeLuv, uploadFreeLuvImage } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadFreeLuvImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadFreeLuvImage}>
    <Image src={image || '/images/luvholder.png'} />
  </Dropzone>

const CreateFreeLuv = ({ user, luv, saveFreeLuv, uploadFreeLuvImage, history }) =>
  user.isAuthenticated ?
    <Redirect to='/luvs/new' from='/luvs/try' />
  :
  luv.isSaved ?
    <Redirect to='/signup' from='/luvs/try' />
  :
  <RootLayout>
    <Card>
      <Avatar image={luv.image} uploadFreeLuvImage={img => uploadFreeLuvImage(img[0])} />
      <Card.Content>
        <Card.Header>New Luv</Card.Header>
        <Card.Description>
          <CreateFreeLuvForm onSubmit={values => {
            saveFreeLuv(({...values, image: luv.image}), user)
          }} />
        </Card.Description>
      </Card.Content>
    </Card>
  </RootLayout>

const mapStateToProps = ({user, luvs}) =>
({
  user,
  luv: luvs.free
})

const mapDispatchToProps = dispatch =>
({
  saveFreeLuv: (luv, user) => dispatch(saveFreeLuv(luv, user)),
  uploadFreeLuvImage: (img) => dispatch(uploadFreeLuvImage(img))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateFreeLuv)
