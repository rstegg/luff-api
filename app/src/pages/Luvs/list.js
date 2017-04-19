import React from 'react'

import LuvsItem from '../../elements/LuvsItem'

const LuvsList =
({
  Luvs,
  setCurrentLuv
}) =>
  <ul className='Luvs--list'>
    {
      Luvs.length ? Luvs.map((Luv, i) =>
        <LuvsItem key={`Luv-${i}`} Luv={Luv} onClick={() => setCurrentLuv(Luv)} />
      )
      :
      <li>
        No Luvs!
      </li>
    }
  </ul>

export default LuvsList
