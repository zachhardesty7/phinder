import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail
} from 'native-base'

export default class TEST extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Test',
    headerLeft: (
      <Button transparent onPress={() => navigation.push('Profile')}>
        <Thumbnail small source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
      </Button>
    ),
    headerRight: (
      <Button transparent onPress={() => alert('This is a button!')}>
        <Icon name='settings' />
      </Button>
    )
  });

  render() {
    return (
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
  }
}
