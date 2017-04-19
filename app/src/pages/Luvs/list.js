import React from 'react'

import LuvsItem from '../../elements/LuvsItem'

const LuvsList =
({
  luvs,
  setCurrentLuv
}) =>
  <ul className='luvs--list'>
    {
      luvs.length ? luvs.map((luv, i) =>
        <LuvsItem key={`luv-${i}`} luv={luv} onClick={() => setCurrentLuv(luv)} />
      )
      :
      <li>
        No Luvs!
      </li>
    }
  </ul>

export default LuvsList
