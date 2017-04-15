import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import StubsList from './list'
import RouterButton from '../../elements/RouterButton'

import { fetchStubs, refreshStubs, setCurrentStub } from '../../redux/actions/stubs'

import RootLayout from '../../components/layouts/Root'

class Stubs extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchStubs(this.props.user)
      this.props.refreshStubs()
    }
  }
  render() {
    const { stubs, setCurrentStub } = this.props
    if(!this.props.user.isAuthenticated) {
      return <Redirect to='/login' from='/stubs/new' />
    }
    return (
      <RootLayout>
        <div className='main'>
          <Card>
            <Card.Content>
              <Card.Header>Stubs</Card.Header>
              <Card.Description>
                <StubsList
                  stubs={stubs.list}
                  setCurrentStub={setCurrentStub}
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <RouterButton to='/stubs/new' from='/stubs' label='Create a Stub' />
            </Card.Content>
          </Card>
        </div>
      </RootLayout>
    )
  }
}
const mapStateToProps = ({stubs, user}) =>
({
  stubs,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchStubs: user => dispatch(fetchStubs(user)),
  refreshStubs: () => dispatch(refreshStubs()),
  setCurrentStub: stub => dispatch(setCurrentStub(stub)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stubs)
