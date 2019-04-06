import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Right,
  Text,
  Thumbnail,
  Title
} from 'native-base'

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerLeft: (
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon ios='ios-close' android='md-close' />
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
          <Form>
            <Item floatingLabel>
              <Label>Full Name</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>DOB</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Phone</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Major</Label>
              <Input />
            </Item>
          </Form>
        </Content>

      </Container>
    )
  }
}
