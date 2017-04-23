import React from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Header, Image, Button } from 'semantic-ui-react'

const LuvsItem = ({className, onClick, luv}) =>
    <Table.Row textAlign='center'>
        <Table.Cell textAlign='center'>
          <Header as='h4' image>
            <Image src={luv.image || '/luvholder.png'} shape='rounded' size='mini' />
            <Header.Content>
              {luv.name}
              <Header.Subheader>{luv.amount_type} {luv.amount_type === 'fixed' && `${luv.amount}`}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Header as='h3'>
            <Header.Content>
              {luv.raised}
              <Header.Subheader>{luv.amount_type}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
          <NavLink to={`/luvs/view/${luv.slug}`}>
            <Button positive size='mini'>Show some luv</Button>
          </NavLink>
        </Table.Cell>
    </Table.Row>


export default LuvsItem
