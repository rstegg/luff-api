import React from 'react'

import LuvsItem from '../../elements/LuvsItem'
import { Feed } from 'semantic-ui-react'

const LuvsList =
({
  luvs,
  setCurrentLuv
}) =>
      <Feed>
      {luvs.length ? luvs.map((luv, i) =>
        <LuvsItem key={`luv-${i}`} luv={luv} onClick={() => setCurrentLuv(luv)} />
      ) :
      <Feed.Event>
        <Feed.Label image='/images/luvholder.png' />
        <Feed.Content content='No Luvs!' />
      </Feed.Event>
      }
    </Feed>





export default LuvsList
