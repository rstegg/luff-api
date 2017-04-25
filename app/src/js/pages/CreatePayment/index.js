import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import CreatePaymentForm from './form'

import { createPayment } from '../../redux/actions/payments'
import { fetchSingleLuv } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

class CreatePayment extends Component {
  componentWillMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchSingleLuv(this.props.match.params.id, this.props.user)
    }
  }
  render() {
    const { user, luv, payment, createPayment } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' from='/payments/new' />
    }
    if(payment.isCreated) {
      return <Redirect to='/payments' from='/payments/new' />
    }
    return (
      <RootLayout>
        <Card>
          <Card.Content>
            <Card.Header>New Payment</Card.Header>
            <Card.Description>
              <CreatePaymentForm
                luv={this.props.luv}
                onSubmit={payment => {
                  if(luv.amount_type === 'fixed') {
                    payment.amount = luv.amount
                  }
                  createPayment(payment, user, luv.id)
                }}
              />
            </Card.Description>
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({user, luvs, payments}) =>
({
  user,
  luv: luvs.current,
  payment: payments.new
})

const mapDispatchToProps = dispatch =>
({
  createPayment: (payment, user, luvId) => dispatch(createPayment(payment, user, luvId)),
  fetchSingleLuv: (id, user) => dispatch(fetchSingleLuv(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePayment)
