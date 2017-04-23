import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Home.css'

import { Card, Table } from 'semantic-ui-react'
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
        <Card className='feed'>
          <Card.Content>
            <Card.Header>World Luv</Card.Header>
            <Card.Description>
              <Table fixed singleLine unstackable color='pink' inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Collecting for</Table.HeaderCell>
                    <Table.HeaderCell>Collected</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <FeedList
                  feed={this.props.feed || []}
                  setCurrentLuv={setCurrentLuv}
                />
            </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <RouterButton to='/luvs/new' from='/' label='Make a luv' />
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
