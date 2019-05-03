import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import AuthScreen from '../screens/AuthScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

const AuthStack = createStackNavigator({ Auth: AuthScreen })

export default createAppContainer(createSwitchNavigator(
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
))
