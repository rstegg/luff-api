import React from 'react'

import LuvsItem from '../../elements/LuvsItem'
import { Table } from 'semantic-ui-react'

const FeedList =
({
  feed,
  setCurrentLuv
}) =>
      <Table.Body>
      {feed.length ? feed.map((luv, i) =>
        <LuvsItem key={`luv-${i}`} luv={luv} onClick={() => setCurrentLuv(luv)} />
      ) :
        <Table.Row>
          <Table.Cell />
          <Table.Cell>
            No World Luvs!
          </Table.Cell>
          <Table.Cell />
        </Table.Row>
      }
    </Table.Body>

export default FeedList
