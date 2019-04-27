import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import { Icon } from 'native-base'

import HomeScreen from '../screens/HomeScreen'
import OrgsScreen from '../screens/OrgsScreen'
import OrgScreen from '../screens/OrgScreen'
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
      name='home'
    />
  )
}

const OrgsStack = createStackNavigator({
  Orgs: OrgsScreen,
  Org: OrgScreen
}, {
  mode: 'modal'
})

OrgsStack.navigationOptions = {
  tabBarLabel: 'Orgs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='eye'
    />
  )
}

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
  OrgsStack,
  ProfileStack
})
