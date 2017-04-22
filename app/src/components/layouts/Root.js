import React from 'react'
import './Root.css'

import Menu from '../Menu'
import Header from '../Header'

const isMobile = window.matchMedia('only screen and (max-width: 760px)')

export default ({children}) =>
  <div className='root'>
    <Header isMobile={isMobile} />
      <div className='main'>
        {children}
      </div>
    <Menu isMobile={isMobile} />
  </div>
