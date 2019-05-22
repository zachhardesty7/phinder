import React from 'react'
import { AsyncStorage } from 'react-native'
import {
  Container,
  Content,
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

import { view } from 'react-easy-state'
import { logout } from '../utils/auth'
import { db } from '../utils/firebase'
import { user } from '../utils/userStore'

import { colors } from '../constants/colors'

import * as S from '../components/styled'

export const ProfileScreen = view(
  class Profile extends React.Component {
    state = {
      loading: false,
      data: user.data
    };

    handleLogout = async() => {
      const { navigation } = this.props

      await logout()
      await AsyncStorage.clear()

      navigation.navigate('Auth')
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
          <Container>
            <Content>
              <S.Thumbnail.Profile large source={{ uri: data.photoURL }} />
              <S.Form>
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
                    placeholderStyle={{ color: colors.pickerPlaceholder }}
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
              </S.Form>

              <S.View.Buttons>
                <S.Button onPress={this.handleSaveClick} title='Save Changes' success>
                  <S.Text>Save Changes</S.Text>
                </S.Button>
                <S.Button onPress={this.handleLogout} title='Logout' light>
                  <S.Text>Logout</S.Text>
                </S.Button>
              </S.View.Buttons>
            </Content>
          </Container>
        )
      )
    }
  }
)
