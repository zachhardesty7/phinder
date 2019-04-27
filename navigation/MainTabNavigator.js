import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import { Icon } from 'native-base'

import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen'

import Colors from '../constants/Colors'

const TabBarIcon = ({ name, focused }) => (
  <Icon
    name={name}
    focused={focused}
    style={{
      color: focused
        ? Colors.tabIconSelected
        : Colors.tabIconDefault,
      marginBottom: -3
    }}
  />
)

const HomeStack = createStackNavigator({
  Home: HomeScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`information-circle${focused ? '' : '-outline'}`}
    />
  )
}

const LinksStack = createStackNavigator({
  Links: LinksScreen
})

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='link'
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='options'
    />
  )
}

// const ProfileStack = createStackNavigator({
//   Test: TestScreen,
//   Profile: ProfileScreen
// }, {
//   mode: 'modal'
// })

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='contact'
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  ProfileStack
})
