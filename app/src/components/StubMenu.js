import React from 'react'

import { Menu, Button } from 'semantic-ui-react'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

const TwitterIcon = generateShareIcon('twitter')

const {
  TwitterShareButton
} = ShareButtons

const StubMenu = ({url}) =>
  <Menu vertical compact>
    <Menu.Item>
      <CopyToClipboard text={url}>
        <Button circular basic icon='linkify' size='medium' />
      </CopyToClipboard>
    </Menu.Item>
    <Menu.Item>
      <TwitterShareButton
        title="Pay me money"
        url={url}
        style={{cursor: 'pointer'}}>
          <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </Menu.Item>
    <Menu.Item>
      <Button circular basic icon='mail' size='medium' />
    </Menu.Item>
  </Menu>

export default StubMenu
