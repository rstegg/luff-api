import React from 'react'
import { Feed } from 'semantic-ui-react'
import moment from 'moment'

const formatDate = date => moment(date, 'YYYY-MM-DD').fromNow()

const LuvsItem = ({className, onClick, luv}) =>
    <Feed.Event as='a' href={`/luvs/view/${luv.slug}`}>
      <Feed.Label image={luv.image || '/luvholder.png'} />
      <Feed.Content
        date={formatDate(luv.createdAt)}
        summary={luv.name}
        extraText={luv.description}
      />
    </Feed.Event>

export default LuvsItem
