// import styled from 'styled-components/native'
import React from 'react'
import {
  Container,
  Content,
  Icon,
  Left,
  ListItem,
  Right,
  Text
} from 'native-base'

const List = () => (
  <Container>
    <Content>
      <List>
        <ListItem first button>
          <Left>
            <Text>Simon Mignolet</Text>
          </Left>
          <Right>
            <Icon name='arrow-forward' />
          </Right>
        </ListItem>
        <ListItem selected>
          <Text>Nathaniel Clyne</Text>
        </ListItem>
        <ListItem last>
          <Text>Dejan Lovren</Text>
        </ListItem>
      </List>
    </Content>
  </Container>
)
