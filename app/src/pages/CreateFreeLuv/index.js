import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreateLuvForm from './form'

import { saveFreeLuv, uploadLuvImage } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadLuvImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadLuvImage}>
    <Image src={image || '/luvholder.png'} />
  </Dropzone>

const CreateLuv = ({ user, luv, saveFreeLuv, uploadLuvImage }) =>
  user.isAuthenticated ?
    <Redirect to='/luvs/new' from='/luvs/try' />
  :
  <RootLayout>
    <Card>
      <Avatar image={luv.image} uploadLuvImage={img => uploadLuvImage(img[0], user)} />
      <Card.Content>
        <Card.Header>New Luv</Card.Header>
        <Card.Description>
          <CreateLuvForm onSubmit={values => {
            saveFreeLuv(({...values, image: luv.image}), user)
            this.props.history.push('/signup')
          }} />
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
  saveFreeLuv: (luv, user) => dispatch(saveFreeLuv(luv, user)),
  uploadLuvImage: (img, user) => dispatch(uploadLuvImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateLuv)
