import React from 'react'

import { Feed, Image } from 'semantic-ui-react'
import moment from 'moment'

import { path } from 'ramda'

const luvUsername = path(['user', 'username'])
const luvUserImage = path(['user', 'image'])

const formatDate = date => moment(date, 'YYYY-MM-DD').fromNow()

const LuvsItem = ({className, onClick, luv}) =>
    <Feed.Event as='a' href={`/luv/${luv.slug}`}>
      <Feed.Label className='luv--img'>
        <Image src={luv.image || '/images/luvholder.png'} alt={luv.name} avatar />
      </Feed.Label>
      <Feed.Content>
        <Feed.Date>{formatDate(luv.createdAt)}</Feed.Date>
        <Feed.Summary>
           {luv.name}
        </Feed.Summary>
        <Feed.Extra text>
          <Image src={luvUserImage(luv) || '/images/placeholder.png'} avatar />
           <span>{luvUsername(luv)}</span>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>

export default LuvsItem
