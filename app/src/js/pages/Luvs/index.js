import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import LuvsList from './list'
import RouterButton from '../../elements/RouterButton'

import { fetchLuvs, refreshLuvs, setCurrentLuv } from '../../redux/actions/luvs'

import RootLayout from '../../components/layouts/Root'

class Luvs extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchLuvs(this.props.user)
    }
    this.props.refreshLuvs()
  }
  render() {
    const { luvs, setCurrentLuv, user } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to="/login" from="/luvs" />
    }
    return (
      <RootLayout>
        <Card className='luvs'>
          <Card.Content>
            <Card.Header>Luvs</Card.Header>
          </Card.Content>
          <Card.Content>
              <LuvsList
                luvs={luvs.list}
                setCurrentLuv={setCurrentLuv}
              />
          </Card.Content>
          <Card.Content extra>
            <RouterButton to='/luvs/new' from='/luvs' label='start a luv' />
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}
const mapStateToProps = ({luvs, user}) =>
({
  luvs,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchLuvs: user => dispatch(fetchLuvs(user)),
  refreshLuvs: () => dispatch(refreshLuvs()),
  setCurrentLuv: Luv => dispatch(setCurrentLuv(Luv)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Luvs)
