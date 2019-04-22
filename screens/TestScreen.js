import { AuthSession } from 'expo'
// import { Ionicons } from '@expo/vector-icons'
// import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  Button as Button2, StyleSheet, Text as Text2, View
} from 'react-native'
import {
  Button,
  Container,
  Content,
  // Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail
} from 'native-base'

const FB_APP_ID = '434884557246474'

export default class TEST extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Test',
    headerLeft: (
      <Button transparent onPress={() => navigation.push('Profile')}>
        <Thumbnail small source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
      </Button>
    ),
    headerRight: (
      <Button transparent onPress={() => alert('This is a button!')}>
        <Icon name='settings' />
      </Button>
    )
  });

  state = {
    result: null
  };

  // isDataAccessExpired
  // dataAccessExpirationTime
  // payload: data_access_expiration_time

  handlePressAsync = async() => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    })
    const profile = await this.getProfile(result.params.access_token)
    const profileData = await profile.json()
    console.log(profileData)
    this.setState({ result, profileData })
  };

  getProfile = async token => (
    fetch(`${'https://graph.facebook.com/v3.2/me?fields='}${['id', 'email', 'name', 'picture'].join(',')}&access_token=${token}`)
  )

  render() {
    const { result, profileData } = this.state
    return (
      <Container>
        <View style={styles.container}>
          <Button2 title='Continue with Facebook' onPress={this.handlePressAsync} />
          {/* {result ? (
            <Text2>{JSON.stringify(result)}</Text2>
          ) : null} */}
          {result ? (
            <Text2>{JSON.stringify(profileData)}</Text2>
          ) : null}
        </View>
        <Content>
          <List>
            <ListItem first button>
              <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
                <Icon name='arrow-forward' />
              </Right>
            </ListItem>
            <ListItem selected>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem last>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
