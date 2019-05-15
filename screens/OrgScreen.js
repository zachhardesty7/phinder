import React, { Component } from 'react'
import { Linking } from 'react-native'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  H1,
  Icon,
  Left,
  Text,
  Thumbnail,
  Toast
} from 'native-base'

import { view } from 'react-easy-state'
import { db } from '../src/integrations'
import { user } from '../src/userStore'

class OrgScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Org',
    headerLeft: (
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon ios='ios-close' android='md-close' />
      </Button>
    )
  });

  handleApply = async() => {
    const { navigation } = this.props
    const id = navigation.getParam('key', 'key')

    const org = await db
      .collection('orgs')
      .doc(id)
      .get()

    const { applications, members } = org.data()

    if (!applications.includes(user.data.uid) && !members.includes(user.data.uid)) {
      applications.push(user.data.uid)
    }

    Toast.show({
      type: 'success',
      duration: 3000,
      text: 'Application submitted!',
      buttonText: 'Okay'
    })

    await db
      .collection('orgs')
      .doc(id)
      .update({ applications })
  }

  render() {
    const { navigation } = this.props
    const name = navigation.getParam('name', null)
    const address = navigation.getParam('address', null)
    const bio = navigation.getParam('bio', null)
    const email = navigation.getParam('email', null)
    const facebook = navigation.getParam('facebook', null)
    const image = navigation.getParam('image', null)
    const instagram = navigation.getParam('instagram', null)
    const phone = navigation.getParam('phone', null)
    const twitter = navigation.getParam('twitter', null)
    const website = navigation.getParam('website', null)

    return (
      <Container>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                {image && <Thumbnail source={{ uri: image }} />}
                <Body>
                  <H1>{name}</H1>
                  {website && <Text onPress={() => Linking.openURL(website).catch(err => console.error(err))} note>{website}</Text>}
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {bio && <Text>{bio}</Text>}
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Contact Info</Text>
                {address && <Text>{address}</Text>}
                {email && <Text>{email}</Text>}
                {facebook && <Text>{facebook}</Text>}
                {instagram && <Text>{instagram}</Text>}
                {twitter && <Text>{twitter}</Text>}
                {phone && <Text>{phone}</Text>}
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                  block
                  onPress={this.handleApply}
                >
                  <Text>Apply to Org</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>

        </Content>
      </Container>
    )
  }
}

export default view(OrgScreen)
