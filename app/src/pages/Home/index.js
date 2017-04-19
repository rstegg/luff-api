import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Home.css'

import { Card } from 'semantic-ui-react'
import FeedItem from '../../elements/FeedItem'

import { fetchFeed } from '../../redux/actions/feed'

import RootLayout from '../../components/layouts/Root'

class Home extends Component {
  componentWillMount() {
    this.props.fetchFeed()
  }
  render() {
    return (
      <RootLayout>
        <Card>
          <Card.Content>
            <Card.Header>Recent Luvs</Card.Header>
            <Card.Description>
              <ul className='feed--list'>
                {this.props.feed.length ? this.props.feed.map(feedItem =>
                  <FeedItem key={`feed-${feedItem.id}`} luv={feedItem} />
                ) : <li>Nothing</li>}
              </ul>
            </Card.Description>
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({feed}) =>
({
  feed: feed.list
})

const mapDispatchToProps = dispatch =>
({
  fetchFeed: () => dispatch(fetchFeed())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
