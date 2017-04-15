import React from 'react'
import './Root.css'

import Menu from '../Menu'
import Header from '../Header'

export default ({children}) =>
  <div className='root'>
    <Header />
    {children}
    <Menu />
  </div>
