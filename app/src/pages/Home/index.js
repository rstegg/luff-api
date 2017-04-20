import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Home.css'

import { Card } from 'semantic-ui-react'
import FeedList from './list'

import { fetchFeed } from '../../redux/actions/feed'
import { setCurrentLuv } from '../../redux/actions/luvs'

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
              <FeedList
                feed={this.props.feed || []}
                setCurrentLuv={setCurrentLuv}
              />
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
