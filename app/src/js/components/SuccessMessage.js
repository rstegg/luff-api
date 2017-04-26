import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import { resetSignup } from '../redux/actions/signup'
import { createLuv } from '../redux/actions/luvs'

class SuccessMessage extends Component {
  componentWillUpdate() {
    if(this.props.visible) {
      if(this.props.luv.isSaved) {
        this.props.createLuv(this.props.luv, this.props.user)
      }
    }
  }
  render() {
    const { visible, resetSignup } = this.props
    return (
      <Modal open={visible} onClose={resetSignup} basic size='small'>
        <Header icon='mail' content='Success!' />
      <Modal.Content>
        <h3>Check your email for verification.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={resetSignup} inverted>
          <Icon name='checkmark' />
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

const mapStateToProps = ({user, luvs}) =>
({
  user,
  luv: luvs.free,
  visible: user.isRegistered
})

const mapDispatchToProps = dispatch =>
({
  resetSignup: () => dispatch(resetSignup()),
  createLuv: (luv, user) => dispatch(createLuv(luv, user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessMessage)
