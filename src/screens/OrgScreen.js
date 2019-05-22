import React from 'react'
import { Linking } from 'react-native'
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  H1,
  H3,
  Left,
  Text,
  Toast
} from 'native-base'

import { view } from 'react-easy-state'
import { db } from '../utils/firebase'
import { user } from '../utils/userStore'

import * as S from '../components/styled'

export const OrgScreen = view(({ navigation }) => {
  const handleApplyPress = async(id, applications, members) => {
    if (!applications.includes(user.data.uid) && !members.includes(user.data.uid)) {
      applications.push(user.data.uid)
    }

    await db
      .collection('orgs')
      .doc(id)
      .update({ applications })

    Toast.show({
      type: 'success',
      duration: 3000,
      text: 'Application submitted!',
      buttonText: 'Okay'
    })
  }

  const handleWebsitePress = (website) => {
    // WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode')
    Linking.openURL(website).catch(err => console.error(err))
  }

  const {
    key,
    name,
    address,
    bio,
    email,
    facebook,
    image,
    instagram,
    phone,
    twitter,
    website,
    applications = [],
    members = [],
    owner
  } = navigation.state.params.item

  const cardStyle = { flex: 0 }

  return (
    <Container>
      <Content>
        <Card style={cardStyle}>
          <CardItem>
            <Left>
              {image && <S.Thumbnail.Org source={{ uri: image }} />}
              <Body>
                <H1>{name}</H1>
                {website && <Text onPress={link => handleWebsitePress(link)} note>{website}</Text>}
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
              <H3>Contact Info</H3>
              {address && <Text>{address}</Text>}
              {email && <Text>{email}</Text>}
              {facebook && <Text>{facebook}</Text>}
              {instagram && <Text>{instagram}</Text>}
              {twitter && <Text>{twitter}</Text>}
              {phone && <Text>{phone}</Text>}
            </Body>
          </CardItem>
          <CardItem>
            {user.data.uid !== owner && (
              <S.Button
                marginLeft='0px'
                block
                onPress={() => handleApplyPress(key, applications, members)}
              >
                <Text>Apply to Org</Text>
              </S.Button>
            )}
            {user.data.uid === owner && (
            <>
              <S.Button
                marginLeft='0px'
                block
                onPress={() => navigation.push('Members', { key, members })}
              >
                <Text>View Members</Text>
              </S.Button>
              <S.Button
                block
                onPress={() => navigation.push('Applications', {
                  key,
                  members,
                  applications,
                  reloadOrgs: navigation.state.params.reloadOrgs
                })}
              >
                <Text>View Applications</Text>
              </S.Button>
            </>
            )}
          </CardItem>
        </Card>

      </Content>
    </Container>
  )
})
