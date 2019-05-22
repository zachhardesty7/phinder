import React from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import {
  AppLoading,
  Asset,
  Font,
  Icon
} from 'expo'
import { Root } from 'native-base'
import AppNavigator from './src/navigation/AppNavigator'

export default class App extends React.Component {
  state = {
    isReady: false
  }

  loadResourcesAsync = async() => Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free
      // to remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
    })
  ]);

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  };

  handleFinishLoading = () => {
    this.setState({ isReady: true })
  };

  render() {
    const { skipLoadingScreen } = this.props
    const { isReady } = this.state

    if (!isReady && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      )
    }
    return (
      <Root>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AppNavigator />
        </View>
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
})
