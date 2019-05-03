// import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  AsyncStorage,
  View
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
  Textarea,
  Thumbnail
} from 'native-base'

import 'firebase/firestore'
import styled from 'styled-components/native'

import { view } from 'react-easy-state'
import { AuthService } from '../src/Auth'
import { db } from '../src/integrations'
import { user } from '../src/userStore'

const S = {}

S.Thumbnail = styled(Thumbnail)`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 5px;
`

S.Button = styled(Button)`
  display: flex;
  flex: 1;
  align-items: center;
  text-align: center;
`

S.View = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: row;
`

S.Text = styled(Text)`
  text-align: center;
`

export default view(class Profile extends Component {
  static navigationOptions = () => ({
    title: 'Profile'
  });

  state = {
    loading: false,
    data: user.data
  };

  handleLogout = async() => {
    await AuthService.logout()
    await AsyncStorage.clear()

    this.props.navigation.navigate('Auth')
  }

  handleSaveClick = () => {
    const { data } = this.state
    user.data = data

    db
      .collection('users')
      .doc(data.uid)
      .set(data)
  }

  handleFormFieldChange = (key, value) => {
    const { data } = this.state

    this.setState({
      data: { ...data, [key]: value }
    })
  }

  render() {
    const { loading, data } = this.state

    return (
      loading ? (
        <Container>
          <Content>
            <Text>Loading Profile...</Text>
            <Spinner />
          </Content>
        </Container>
      ) : (
        <S.Container>
          <Content>
            <S.Thumbnail large source={{ uri: data.photoURL }} />
            <Form>
              <Item stackedLabel>
                <Label>Full Name</Label>
                <Input value={data.displayName} onChangeText={text => this.handleFormFieldChange('displayName', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input value={data.email} onChangeText={text => this.handleFormFieldChange('email', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Phone</Label>
                <Input value={data.phoneNumber} onChangeText={text => this.handleFormFieldChange('phoneNumber', text)} />
              </Item>
              <Item picker stackedLabel>
                <Label>Year</Label>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='arrow-down' />}
                  placeholder='select your year'
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor='#007aff'
                  selectedValue={data.year}
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
                <Input value={data.major} onChangeText={text => this.handleFormFieldChange('major', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Bio</Label>
                <Textarea
                  rowSpan={4}
                  value={data.bio}
                  onChangeText={text => this.handleFormFieldChange('bio', text)}
                  placeholder='Write a little something about yourself!'
                />
              </Item>
            </Form>

            <S.View>
              <S.Button onPress={this.handleSaveClick} title='Save Changes' success>
                <S.Text>Save Changes</S.Text>
              </S.Button>
              <S.Button onPress={this.handleLogout} title='Logout' light>
                <S.Text>Logout</S.Text>
              </S.Button>
            </S.View>
          </Content>
        </S.Container>
      )
    )
  }
})
