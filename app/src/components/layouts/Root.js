import React from 'react'
import './Root.css'

import Menu from '../Menu'
import Header from '../Header'

export default ({children}) =>
  <div className='root'>
    <Header />
      <div className='main'>
        {children}
      </div>
    <Menu />
  </div>
