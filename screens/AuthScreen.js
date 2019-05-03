// import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  AsyncStorage,
  Image
} from 'react-native'
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Spinner,
  Text,
  Textarea
} from 'native-base'

import 'firebase/firestore'

import { view } from 'react-easy-state'
import { AuthService } from '../src/Auth'
import { db } from '../src/integrations'
import { user } from '../src/userStore'

export default view(class Profile extends Component {
  static navigationOptions = () => ({
    title: 'Please sign in'
  });

  componentDidMount = async() => {
    AuthService.subscribeAuthChange(async(data) => {
      if (data && data.providerData && data.providerData[0]) {
        await AsyncStorage.setItem('uid', data.providerData[0].uid)
        const userData = await db.collection('users').doc(data.providerData[0].uid).get()
        user.data = userData.data()
        this.props.navigation.navigate('Home')
      }
    })
  }

  handleLogin = async() => {
    await AuthService.loginWithFacebook()
    // await AsyncStorage.setItem('user', user)
    // this.props.navigation.navigate('App')
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>Welcome!</Text>
          <Button onPress={this.handleLogin} title='Login with Facebook'>
            <Text>Login with Facebook</Text>
          </Button>
        </Content>
      </Container>
    )
  }
})
