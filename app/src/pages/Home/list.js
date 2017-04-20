import React from 'react'

import LuvsItem from '../../elements/LuvsItem'

const FeedList =
({
  feed,
  setCurrentLuv
}) =>
  <ul className='feed--list'>
    {
      feed.length ? feed.map((luv, i) =>
        <LuvsItem key={`luv-${i}`} luv={luv} onClick={() => setCurrentLuv(luv)} />
      )
      :
      <li>
        No Luvs!
      </li>
    }
  </ul>

export default FeedList
