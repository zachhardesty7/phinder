import React from 'react'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import {
  Container,
  Content,
  H3,
  Input,
  Item,
  Label,
  Textarea,
  Toast
} from 'native-base'

import firebase from 'firebase/app'
import 'firebase/firestore'

import uuid from 'uuid'

import { view } from 'react-easy-state'
import { db } from '../utils/firebase'
import { user } from '../utils/userStore'

import * as S from '../components/styled'

export const OrgCreateScreen = view(
  // TODO: upgrade to hooks
  class OrgCreate extends React.Component {
    state = { loading: false, info: { owner: user.data.uid } }

    handleCreatePress = async() => {
      const { info } = this.state
      const { navigation } = this.props

      await db
        .collection('orgs')
        .add(info)

      await Toast.show({
        type: 'success',
        duration: 3000,
        text: 'Org Created!',
        buttonText: 'Okay'
      })

      navigation.state.params.reloadOrgs()
      navigation.goBack()
    }

    handleImageUploadPress = async() => {
      const { info } = this.state
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

      if (status === 'granted') {
        const image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          exif: true,
          base64: true
        })

        if (image.cancelled === false) {
          this.setState({ loading: true })

          const uriParts = image.uri.split('.')
          const fileType = uriParts[uriParts.length - 1]

          // only accepts `Blob` object types
          const blob = await getBlob(image.uri)
          const snapshot = await firebase.storage().ref().child(`${uuid.v4()}.${fileType}`).put(blob)

          blob.close()

          const link = await snapshot.ref.getDownloadURL()

          this.setState({ loading: false, info: { ...info, image: link } })
        }
      } else {
        throw new Error('Camera Roll permission not granted')
      }
    }

    handleFormFieldChange = (key, value) => {
      const { info } = this.state
      this.setState({
        info: { ...info, [key]: value }
      })
    }

    render() {
      const { info, loading } = this.state
      const { navigation } = this.props

      return (
        <Container>
          <Content>
            <S.View.Center>
              {loading
                ? (
                  <>
                    <S.Spinner color='blue' />
                    <S.Text>uploading...</S.Text>
                  </>
                )
                : (
                  <>
                    <S.Thumbnail.Profile square large source={{ uri: info.image || 'http://1.gravatar.com/avatar/3e3dd965fe5ed95d2a0b2b015ace6fd7?s=500&d=http://1.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=500&r=G' }} />
                    <S.ButtonRound
                      onPress={this.handleImageUploadPress}
                      title='Upload Image'
                      light
                      small
                      rounded
                    >
                      <S.Text>Upload Image</S.Text>
                      <S.IconRight name='cloud-upload' />
                    </S.ButtonRound>
                  </>
                )
              }
            </S.View.Center>
            <S.Form>
              <S.Separator>
                <H3>Basic Info</H3>
              </S.Separator>
              <Item stackedLabel>
                <Label>Name</Label>
                <Input onChangeText={text => this.handleFormFieldChange('name', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Nickname</Label>
                <Input onChangeText={text => this.handleFormFieldChange('nickname', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Website</Label>
                <Input onChangeText={text => this.handleFormFieldChange('website', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Address</Label>
                <Input onChangeText={text => this.handleFormFieldChange('address', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Bio</Label>
                <Textarea
                  rowSpan={4}
                  onChangeText={text => this.handleFormFieldChange('bio', text)}
                  placeholder='Write a little something about your org!'
                />
              </Item>

              <S.Separator>
                <H3>Contact Info</H3>
              </S.Separator>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input onChangeText={text => this.handleFormFieldChange('email', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Phone</Label>
                <Input onChangeText={text => this.handleFormFieldChange('phone', text)} />
              </Item>

              <S.Separator>
                <H3>Social Media</H3>
              </S.Separator>
              <Item stackedLabel>
                <Label>Facebook</Label>
                <Input onChangeText={text => this.handleFormFieldChange('facebook', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Twitter</Label>
                <Input onChangeText={text => this.handleFormFieldChange('twitter', text)} />
              </Item>
              <Item stackedLabel>
                <Label>Instagram</Label>
                <Input onChangeText={text => this.handleFormFieldChange('instagram', text)} />
              </Item>

            </S.Form>

            <S.View.Buttons>
              <S.Button onPress={this.handleCreatePress} title='Create Org' success>
                <S.Text>Create Org</S.Text>
              </S.Button>
              <S.Button onPress={() => navigation.goBack()} title='Cancel' light>
                <S.Text>Cancel</S.Text>
              </S.Button>
            </S.View.Buttons>
          </Content>
        </Container>
      )
    }
  }
)

// @see https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
async function getBlob(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = (e) => {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  return blob
}
