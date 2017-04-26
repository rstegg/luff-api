import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import FeedList from './list'

import { fetchFeed } from '../../redux/actions/feed'
import { setCurrentLuv } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'
import RouterButton from '../../elements/RouterButton'

class Home extends Component {
  componentWillMount() {
    this.props.fetchFeed()
  }
  render() {
    const { setCurrentLuv } = this.props
    return (
      <RootLayout>
        <Card className='luvs'>
          <Card.Content>
            <Card.Header>Public Luvs</Card.Header>
          </Card.Content>
          <Card.Content>
            <FeedList
              feed={this.props.feed || []}
              setCurrentLuv={setCurrentLuv}
            />
          </Card.Content>
          <Card.Content extra>
            <RouterButton to='/luvs/new' from='/' label='start a luv' />
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
  fetchFeed: () => dispatch(fetchFeed()),
  setCurrentLuv: (luv) => dispatch(setCurrentLuv(luv))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
