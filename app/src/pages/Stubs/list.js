import React from 'react'

import StubsItem from '../../elements/StubsItem'

const StubsList =
({
  stubs,
  setCurrentStub
}) =>
  <ul className='stubs--list'>
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

export default StubsList
