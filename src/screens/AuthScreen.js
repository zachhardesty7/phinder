import React from 'react'
import { AsyncStorage } from 'react-native'
import { Container, Content } from 'native-base'

import { view } from 'react-easy-state'
import { loginWithFacebook, subscribeAuthChange } from '../utils/auth'
import { db } from '../utils/firebase'
import { user } from '../utils/userStore'

import * as S from '../components/styled'

export const AuthScreen = view(({ navigation }) => {
  subscribeAuthChange(async(data) => {
    if (data && data.providerData && data.providerData[0]) {
      await AsyncStorage.setItem('uid', data.providerData[0].uid)
      const userData = await db.collection('users').doc(data.providerData[0].uid).get()
      user.data = userData.data()
      navigation.navigate('Home')
    }
  })

  return (
    <Container>
      <Content>
        <S.Button onPress={loginWithFacebook} title='Login with Facebook' marginRight='15px'>
          <S.Text>Login with Facebook</S.Text>
        </S.Button>
      </Content>
    </Container>
  )
})
