import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native'

import { view } from 'react-easy-state'
import { db } from '../src/integrations'
import { user } from '../src/userStore'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async() => {
    const { navigation } = this.props

    const uid = await AsyncStorage.getItem('uid')

    if (uid) {
      const data = await db.collection('users').doc(uid).get()
      user.data = data.data()
      navigation.navigate('Home')
    } else {
      navigation.navigate('Auth')
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

export default view(AuthLoadingScreen)
