// import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  Image
} from 'react-native'
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Spinner,
  Text,
  Textarea
} from 'native-base'

import 'firebase/firestore'

import { AuthService } from '../src/Auth'
import { db } from '../src/integrations'

export default class Profile extends Component {
  static navigationOptions = () => ({
    title: 'Profile'
  });

  state = {
    loading: false,
    user: null
  };

  componentDidMount = async() => {
    AuthService.subscribeAuthChange(async(data) => {
      if (data && data.providerData && data.providerData[0]) {
        this.setState({ loading: true })
        const { uid } = data.providerData[0]
        const user = await db.collection('users').doc(uid).get()
        this.setState({ user: user.data(), loading: false })
      }
    })
  }

  handleLogin = () => {
    this.setState({ loading: true })
    AuthService.loginWithFacebook()
  }

  handleLogout = () => {
    this.setState({ user: null })
    AuthService.logout()
  }

  handleSaveClick = () => {
    const { user } = this.state

    db
      .collection('users')
      .doc(user.uid)
      .set(user)
  }

  handleFormFieldChange = (key, value) => {
    const { user } = this.state

    this.setState({
      user: { ...user, [key]: value }
    })
  }

  render() {
    const { loading, user } = this.state

    if (loading) {
      return (
        <Container>
          <Content>
            <Text>Logging in...</Text>
            <Spinner />
          </Content>
        </Container>
      )
    }

    return (
      user ? (
        <Container>
          <Content>
            <Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
            <Form>
              <Item stackedLabel>
                <Label>Full Name</Label>
                <Input value={user.displayName} onChangeText={text => this.handleFormFieldChange('displayName', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input value={user.email} onChangeText={text => this.handleFormFieldChange('email', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Phone</Label>
                <Input value={user.phoneNumber} onChangeText={text => this.handleFormFieldChange('phoneNumber', text)} />
              </Item>
              <Item picker stackedLabel>
                <Label>Year</Label>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='arrow-down' />}
                  placeholder='select your year'
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor='#007aff'
                  selectedValue={user.year}
                  onValueChange={val => this.handleFormFieldChange('year', val)}
                >
                  <Picker.Item label='Freshman' value='freshman' />
                  <Picker.Item label='Sophomore' value='sophomore' />
                  <Picker.Item label='Junior' value='junior' />
                  <Picker.Item label='Senior' value='senior' />
                </Picker>
              </Item>
              <Item stackedLabel>
                <Label>Major</Label>
                <Input value={user.major} onChangeText={text => this.handleFormFieldChange('major', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Bio</Label>
                <Textarea
                  rowSpan={5}
                  value={user.bio}
                  onChangeText={text => this.handleFormFieldChange('bio', text)}
                  placeholder='Write a little something about yourself!'
                />
              </Item>
            </Form>

            <Button onPress={this.handleSaveClick} title='Save Changes' success>
              <Text>Save Changes</Text>
            </Button>
            <Button onPress={this.handleLogout} title='Logout' light>
              <Text>Logout</Text>
            </Button>
          </Content>
        </Container>
      ) : (
        <Container>
          <Content>
            <Text>Welcome!</Text>
            <Button onPress={this.handleLogin} title='Login with Facebook'>
              <Text>Login with Facebook</Text>
            </Button>
          </Content>
        </Container>
      )
    )
  }
}
