// import { Font } from 'expo'
// import { Ionicons } from '@expo/vector-icons'
// import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Content,
  Icon,
  Text,
  Toast
} from 'native-base'

export default class Org extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Org',
    headerLeft: (
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon ios='ios-close' android='md-close' />
      </Button>
    )
  });

  render() {
    const { navigation } = this.props
    const name = navigation.getParam('name', 'Peter')

    return (
      <Container>
        <Content>
          <Text>{name}</Text>
          <Button
            block
            onPress={() => Toast.show({
              type: 'success',
              duration: 3000,
              text: 'Application submitted!',
              buttonText: 'Okay'
            })}
          >
            <Text>Apply to Org</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
