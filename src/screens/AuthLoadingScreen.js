import React from 'react'
import { AsyncStorage } from 'react-native'

import { view } from 'react-easy-state'
import { db } from '../utils/firebase'
import { user } from '../utils/userStore'

import * as S from '../components/styled'

export const AuthLoadingScreen = view(({ navigation }) => {
  // check for uid in storage then fetch user or force login
  const bootstrapAsync = async() => {
    const uid = await AsyncStorage.getItem('uid')

    if (uid) {
      const data = await db.collection('users').doc(uid).get()
      user.data = data.data() // update global store
      navigation.navigate('Home')
    } else {
      navigation.navigate('Auth')
    }
  }

  bootstrapAsync()

  return (
    <S.View.Center>
      <S.Spinner color='blue' />
      <S.Text>logging in...</S.Text>
    </S.View.Center>
  )
})
