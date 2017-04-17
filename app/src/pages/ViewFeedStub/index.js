import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ViewFeedStub.css'

import { Grid, Card, Rail } from 'semantic-ui-react'
import RootLayout from '../../components/layouts/Root'
import RouterButton from '../../elements/RouterButton'

import StubMenu from '../../components/StubMenu'

import { fetchFeedStub } from '../../redux/actions/feed'

const renderAmount = (amt_type, amt) =>
  amt_type === 'fixed' ?
    <p>Price: {amt}</p>
    :
    <p>Open</p>

class ViewStub extends Component {
  componentWillMount() {
    const { match: { params }, fetchFeedStub, user } = this.props
    fetchFeedStub(params.id, user)
  }
  render() {
    const { stub, user } = this.props
    return (
      <RootLayout>
        <Grid>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>{stub.name}</Card.Header>
                <Card.Meta>{renderAmount(stub.amount_type, stub.amount)}</Card.Meta>
                <Card.Description>{stub.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                { stub.userId === user.id ?
                  <RouterButton to={`/stubs/edit/${stub.slug}`} from={`/stub/${stub.slug}`} label='Edit' />
                  :
                  <RouterButton to={`/payments/new/${stub.slug}`} from={`/stub/${stub.slug}`} label='Pay this stub' />
                }
              </Card.Content>
            </Card>
            <Rail attached position='right'>
              <StubMenu url={`https://luvpay.io/stubs/view/${stub.slug}`} />
            </Rail>
          </Grid.Column>
        </Grid>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({feed, user}) =>
({
  stub: feed.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchFeedStub: (id, user) => dispatch(fetchFeedStub(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStub)
