import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ViewFeedLuv.css'

import { Grid, Card, Rail } from 'semantic-ui-react'
import RootLayout from '../../components/layouts/Root'
import RouterButton from '../../elements/RouterButton'

import LuvMenu from '../../components/LuvMenu'

import { fetchFeedLuv } from '../../redux/actions/feed'

const renderAmount = (amt_type, amt) =>
  amt_type === 'fixed' ?
    <p>Price: {amt}</p>
    :
    <p>Open</p>

class ViewLuv extends Component {
  componentWillMount() {
    const { match: { params }, fetchFeedLuv, user } = this.props
    fetchFeedLuv(params.id, user)
  }
  render() {
    const { Luv, user } = this.props
    return (
      <RootLayout>
        <Grid>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>{Luv.name}</Card.Header>
                <Card.Meta>{renderAmount(Luv.amount_type, Luv.amount)}</Card.Meta>
                <Card.Description>{Luv.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                { Luv.userId === user.id ?
                  <RouterButton to={`/Luvs/edit/${Luv.slug}`} from={`/Luv/${Luv.slug}`} label='Edit' />
                  :
                  <RouterButton to={`/payments/new/${Luv.slug}`} from={`/Luv/${Luv.slug}`} label='Pay this Luv' />
                }
              </Card.Content>
            </Card>
            <Rail attached position='right'>
              <LuvMenu url={`https://luvpay.io/Luvs/view/${Luv.slug}`} />
            </Rail>
          </Grid.Column>
        </Grid>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({feed, user}) =>
({
  Luv: feed.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchFeedLuv: (id, user) => dispatch(fetchFeedLuv(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLuv)
