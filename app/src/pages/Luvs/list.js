import React from 'react'

import LuvsItem from '../../elements/LuvsItem'
import { Table } from 'semantic-ui-react'

const LuvsList =
({
  luvs,
  setCurrentLuv
}) =>
      <Table.Body>
      {luvs.length ? luvs.map((luv, i) =>
        <LuvsItem key={`luv-${i}`} luv={luv} onClick={() => setCurrentLuv(luv)} />
      ) :
        <Table.Row textAlign='center'>
          <Table.Cell>
            No Luvs!
          </Table.Cell>
        </Table.Row>
      }
    </Table.Body>





export default LuvsList
