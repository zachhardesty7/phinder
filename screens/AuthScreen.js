import React, { Component } from 'react'
import {
  AsyncStorage
} from 'react-native'
import {
  Button,
  Container,
  Content,
  Text
} from 'native-base'

import 'firebase/firestore'

import { view } from 'react-easy-state'
import { AuthService } from '../src/Auth'
import { db } from '../src/integrations'
import { user } from '../src/userStore'

class AuthScreen extends Component {
  static navigationOptions = () => ({
    title: 'Please sign in'
  });

  componentDidMount = async() => {
    const { navigation } = this.props

    AuthService.subscribeAuthChange(async(data) => {
      if (data && data.providerData && data.providerData[0]) {
        await AsyncStorage.setItem('uid', data.providerData[0].uid)
        const userData = await db.collection('users').doc(data.providerData[0].uid).get()
        user.data = userData.data()
        navigation.navigate('Home')
      }
    })
  }

  handleLogin = async() => {
    await AuthService.loginWithFacebook()
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
}

export default view(AuthScreen)
