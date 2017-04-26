import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect, NavLink } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'
import RootLayout from '../../components/layouts/Root'
import RouterButton from '../../elements/RouterButton'

import LuvMenu from '../../components/LuvMenu'

import { fetchSingleLuv } from '../../redux/actions/luvs'

const renderAmount = (amt_type, amt) =>
  amt_type === 'fixed' ? `Price: ${amt}` : 'Open donation'

class ViewLuv extends Component {
  componentWillMount() {
    const { match: { params }, fetchSingleLuv, user } = this.props
    fetchSingleLuv(params.id, user)
  }
  render() {
    const { luv, user } = this.props
    if(!luv) {
      return <Redirect to='/' />
    }
      return (
        <RootLayout>
          <Card>
            <Image src={luv.image || '/images/luvholder.png'} className='luv--image' />
            <Card.Content>
              <Card.Header>{luv.name}</Card.Header>
              {luv.user &&
                <NavLink to={`/user/${luv.user.username}`} from={`/luv/${luv.slug}`}>
                  started by <Image avatar src={luv.user.image || '/images/placeholder.png'} /> {luv.user.username}
                </NavLink>
              }
              <Card.Meta>{renderAmount(luv.amount_type, luv.amount)}, ${luv.raised} raised</Card.Meta>
              <Card.Description>{luv.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              { luv.userId === user.id ?
                <RouterButton to={`/luvs/edit/${luv.slug}`} from={`/luv/${luv.slug}`} label='Edit' />
                :
                <RouterButton to={`/payments/new/${luv.slug}`} from={`/luv/${luv.slug}`} label='Show some luv' />
              }
            </Card.Content>
          </Card>
          <LuvMenu url={`https://luvpay.io/luv/${luv.slug}`} />
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
