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
          <Feed.Label image='/luvholder.png' />
          <Feed.Summary>
            No Luvs!
          </Feed.Summary>
        </Feed.Event>
      }
    </Feed>





export default LuvsList
