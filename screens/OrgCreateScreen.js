import React, { Component } from 'react'
import { ImagePicker, Permissions } from 'expo'
import { View } from 'react-native'
import {
  Button,
  Container,
  Content,
  Form,
  H3,
  Icon,
  Input,
  Item,
  Label,
  Separator,
  Spinner,
  Text,
  Textarea,
  Thumbnail,
  Toast
} from 'native-base'
import styled from 'styled-components/native'

import uuid from 'uuid'

import { view } from 'react-easy-state'
import { Firebase, db } from '../src/integrations'
import { user } from '../src/userStore'

const S = {}

S.ImageView = styled(View)`
  display: flex;
  flex: 1;
  align-self: center;
`

S.SubmitView = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 20px 0;
`

S.Thumbnail = styled(Thumbnail)`
  display: flex;
  align-self: center;
  margin: 20px 0;
`

S.Spinner = styled(Spinner)`
  display: flex;
  align-self: center;
  margin-top: 20px;
`

S.Button = styled(Button)`
  display: flex;
  text-align: center;
  margin-left: 15px;
`

S.Text = styled(Text)`
  text-align: center;
`

S.Separator = styled(Separator)`
  margin: 20px 0px;
`

class OrgCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create an Org',
    headerLeft: (
      <Button
        transparent
        onPress={() => navigation.goBack()}
      >
        <Icon ios='ios-close' android='md-close' />
      </Button>
    )
  });

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
        const snapshot = await Firebase.storage().ref().child(`${uuid.v4()}.${fileType}`).put(blob)

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
          <S.ImageView>
            { loading
              ? (
                <>
                  <S.Spinner color='blue' />
                  <S.Text>uploading...</S.Text>
                </>
              )
              : (
                <>
                  <S.Thumbnail square large source={{ uri: info.image || 'http://1.gravatar.com/avatar/3e3dd965fe5ed95d2a0b2b015ace6fd7?s=500&d=http://1.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=500&r=G' }} />
                  <S.Button
                    iconRight
                    onPress={this.handleImageUploadPress}
                    title='Upload Image'
                    light
                    small
                    rounded
                  >
                    <S.Text>Upload Image</S.Text>
                    <Icon name='cloud-upload' />
                  </S.Button>
                </>
              )
            }
          </S.ImageView>
          <Form>
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

          </Form>

          <S.SubmitView>
            <S.Button onPress={this.handleCreatePress} title='Create Org' success>
              <S.Text>Create Org</S.Text>
            </S.Button>
            <S.Button onPress={() => navigation.goBack()} title='Cancel' light>
              <S.Text>Cancel</S.Text>
            </S.Button>
          </S.SubmitView>
        </Content>
      </Container>
    )
  }
}

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

export default view(OrgCreateScreen)
