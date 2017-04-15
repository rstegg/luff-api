import React from 'react'

import StubsItem from '../../elements/StubsItem'

const StubsList =
({
  stubs,
  setCurrentStub
}) =>
  <div className='menu'>
    <ul>
      {
        stubs.length ? stubs.map((stub, i) =>
          <StubsItem key={`stub-${i}`} stub={stub} onClick={() => setCurrentStub(stub)} />
        )
        :
        <li>
          No Stubs!
        </li>
      }
    </ul>
  </div>

export default StubsList
