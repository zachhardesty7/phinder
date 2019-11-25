import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import { AuthScreen } from '../screens/AuthScreen'

const AuthStack = createStackNavigator({
	Auth: {
		screen: AuthScreen,
		navigationOptions: () => ({
			title: 'Welcome!',
		}),
	},
})

export default createAppContainer(createSwitchNavigator(
	{
		Main: MainTabNavigator,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'Auth',
	},
))
