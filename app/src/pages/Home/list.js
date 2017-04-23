import React from 'react'

import LuvsItem from '../../elements/LuvsItem'
import { Feed } from 'semantic-ui-react'

const FeedList =
({
  feed,
  setCurrentLuv
}) =>
    <Feed>
      {
        feed.length ? feed.map((luv, i) =>
        <LuvsItem key={`luv-${i}`} luv={luv} onClick={() => setCurrentLuv(luv)} />
      ) :
      <Feed.Event>
        <Feed.Label image='/luvholder.png' />
        <Feed.Content content='No World Luvs!' />
      </Feed.Event>
      }
    </Feed>

export default FeedList
