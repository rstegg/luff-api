import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import CreatePaymentForm from './form'

import { createPayment } from '../../redux/actions/payments'
import { fetchSingleStub } from '../../redux/actions/stubs'

import RootLayout from '../../components/layouts/Root'

class CreatePayment extends Component {
  componentWillMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchSingleStub(this.props.match.params.id, this.props.user)
    }
  }
  render() {
    const { user, stub, payment, createPayment } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' from='/payments/new' />
    }
    if(payment.isCreated) {
      return <Redirect to='/payments' from='/payments/new' />
    }
    return (
      <RootLayout>
        <div className='main'>
          <Card>
            <Card.Content>
              <Card.Header>New Payment</Card.Header>
              <Card.Description>
                <CreatePaymentForm onSubmit={payment => createPayment(payment, user, stub.id)} />
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({user, stubs, payments}) =>
({
  user,
  stub: stubs.current,
  payment: payments.new
})

const mapDispatchToProps = dispatch =>
({
  createPayment: (payment, user, stubId) => dispatch(createPayment(payment, user, stubId)),
  fetchSingleStub: (id, user) => dispatch(fetchSingleStub(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePayment)
