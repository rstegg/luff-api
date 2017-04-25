import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ViewLuv.css'

import { Redirect } from 'react-router-dom'
import { Card, Grid, Rail, Image } from 'semantic-ui-react'
import RootLayout from '../../components/layouts/Root'
import RouterButton from '../../elements/RouterButton'

import LuvMenu from '../../components/LuvMenu'

import { fetchSingleLuv } from '../../redux/actions/luvs'

import isMobile from '../../utils/isMobile'

const renderAmount = (amt_type, amt) =>
  amt_type === 'fixed' ?
    <p>Price: ${amt}</p>
    :
    <p>Open donation</p>

class ViewLuv extends Component {
  componentWillMount() {
    const { match: { params }, fetchSingleLuv, user } = this.props
    fetchSingleLuv(params.id, user)
  }
  render() {
    const { luv, user } = this.props
      return (
        <RootLayout>
          <Card>
            <Image src={luv.image || '/images/luvholder.png'} />
            <Card.Content>
              <Card.Header>{luv.name}</Card.Header>
              <Card.Meta>{renderAmount(luv.amount_type, luv.amount)}</Card.Meta>
              <Card.Description>{luv.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              { luv.userId === user.id ?
                <RouterButton to={`/luvs/edit/${luv.slug}`} from={`/luv/${luv.slug}`} label='Edit' />
                :
                <RouterButton to={`/payments/new/${luv.slug}`} from={`/luv/${luv.slug}`} label='Pay this luv' />
              }
            </Card.Content>
          </Card>
          <LuvMenu url={`https://luvpay.io/luvs/view/${luv.slug}`} />
        </RootLayout>
      )
  }
}

const mapStateToProps = ({luvs, user}) =>
({
  luv: luvs.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleLuv: (id, user) => dispatch(fetchSingleLuv(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLuv)
