import React from 'react'
import { connect } from 'react-redux'

import { Segment, Button, Popup } from 'semantic-ui-react'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

const TwitterIcon = generateShareIcon('twitter')

const {
  TwitterShareButton
} = ShareButtons

import LuvMenuForm from './form'

import { shareLuv } from '../../redux/actions/luvs'

const LuvMenu = ({url, user, shareLuv}) =>
  <Segment.Group compact>
    <Segment>
      <CopyToClipboard text={url}>
        <Button circular basic icon='linkify' size='medium' />
      </CopyToClipboard>
    </Segment>
    <Segment>
      <TwitterShareButton
        title="Pay me money"
        url={url}
        style={{cursor: 'pointer'}}>
          <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </Segment>
    <Segment>
    <Popup wide trigger={<Button circular basic icon='mail' size='medium' />} on='click'>
        <Popup.Header>Share via Email</Popup.Header>
        <Popup.Content>
          <LuvMenuForm onSubmit={values => shareLuv(values, user)} />
        </Popup.Content>
    </Popup>
  </Segment>
  </Segment.Group>

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  shareLuv: ({name, email, message}, user) => dispatch(shareLuv(email, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LuvMenu)
