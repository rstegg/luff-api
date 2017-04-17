import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ViewPayment.css'

import { Card } from 'semantic-ui-react'
import RootLayout from '../../components/layouts/Root'
import PayMenu from '../../components/PayMenu'

import { fetchSinglePayment } from '../../redux/actions/payments'

class ViewPayment extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    fetchSinglePayment(params.id, user)
  }
  render() {
    const { payment, user } = this.props
    return (
      <RootLayout>
        <div className='pay--menu'>
          <PayMenu />
        </div>
        <Card>
          <Card.Content>
            <Card.Header>{user.first_name} {user.last_name}</Card.Header>
            <Card.Meta>{payment.amount}</Card.Meta>
            <Card.Description>{payment.name}</Card.Description>
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({payments, user}) =>
({
  payment: payments.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSinglePayment: (paymentId, user) => dispatch(fetchSinglePayment(paymentId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPayment)
