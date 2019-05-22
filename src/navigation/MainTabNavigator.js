import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import { Button, Icon } from 'native-base'

import {
  ApplicationsScreen,
  HomeScreen,
  MembersScreen,
  OrgCreateScreen,
  OrgScreen,
  OrgsScreen,
  ProfileScreen
} from '../screens'

import { colors } from '../constants/colors'

const TabBarIconStyle = { marginBottom: -3 }
const TabBarIcon = ({ name, focused }) => (
  <Icon
    name={name}
    focused={focused}
    style={{
      ...TabBarIconStyle,
      color: focused
        ? colors.tabIconSelected
        : colors.tabIconDefault
    }}
  />
)

const HeaderIcon = ({ name, onPress }) => (
  <Button transparent onPress={onPress}>
    <Icon name={name} />
  </Button>
)

const HeaderIconClose = ({ navigation }) => (
  <HeaderIcon name='close' onPress={() => navigation.goBack()} />
)

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Phinder'
    }
  }
}, {
  navigationOptions: {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='home'
      />
    )
  }
})

const OrgsStack = createStackNavigator({
  Orgs: {
    screen: OrgsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Orgs',
      headerRight: (
        <HeaderIcon
          name='add'
          onPress={() => {
            const reloadOrgs = navigation.getParam('reloadOrgs')
            navigation.push('OrgCreate', { reloadOrgs })
          }}
        />
      )
    })
  },
  Org: {
    screen: OrgScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Org',
      headerLeft: <HeaderIconClose navigation={navigation} />
    })
  },
  OrgCreate: {
    screen: OrgCreateScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create an Org',
      headerLeft: <HeaderIconClose navigation={navigation} />
    })
  },
  Applications: {
    screen: ApplicationsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Applications',
      headerLeft: (
        <HeaderIcon
          name='close'
          onPress={() => {
            navigation.state.params.reloadOrgs()
            navigation.popToTop()
          }}
        />
      )
    })
  },
  Members: {
    screen: MembersScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Members',
      headerLeft: <HeaderIconClose navigation={navigation} />
    })
  }
}, {
  navigationOptions: {
    tabBarLabel: 'Orgs',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='eye'
      />
    )
  },
  mode: 'modal'
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Profile'
    }
  }
}, {
  navigationOptions: {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='contact'
      />
    )
  }
})

export default createBottomTabNavigator({
  HomeStack,
  OrgsStack,
  ProfileStack
})
