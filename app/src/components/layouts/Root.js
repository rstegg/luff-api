import React from 'react'
import './Root.css'

import Menu from '../Menu'
import Header from '../Header'

export default ({children}) =>
  <div className='root'>
    <Header />
      <div className='main--test'>
        {children}
      </div>
    <Menu />
  </div>
