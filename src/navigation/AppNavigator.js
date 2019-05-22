import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import { AuthScreen } from '../screens/AuthScreen'
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen'

const AuthStack = createStackNavigator({ Auth: AuthScreen })

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: {
      screen: AuthStack,
      navigationOptions: {
        title: 'Please sign in'
      }
    }
  },
  {
    initialRouteName: 'AuthLoading'
  }
))
