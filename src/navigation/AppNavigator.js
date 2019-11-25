import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import { AuthScreen } from '../screens/AuthScreen'
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen'

const AuthStack = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: () => ({
      title: 'Welcome!'
    })
  }
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
))
