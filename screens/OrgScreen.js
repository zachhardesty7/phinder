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
  H3,
  Icon,
  Left,
  Text,
  Thumbnail,
  Toast
} from 'native-base'
import styled from 'styled-components/native'

import { view } from 'react-easy-state'
import { db } from '../src/integrations'
import { user } from '../src/userStore'

const S = {}

S.Button = styled(Button)`
  display: flex;
  margin-right: 10px;
`

class OrgScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Org',
    headerLeft: (
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon ios='ios-close' android='md-close' />
      </Button>
    )
  });

  handleApplyPress = async(id, applications, members) => {
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

  handleWebsitePress = (website) => {
    Linking.openURL(website).catch(err => console.error(err))
  }

  render() {
    const { navigation } = this.props

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
                {image && <Thumbnail source={{ uri: image }} />}
                <Body>
                  <H1>{name}</H1>
                  {website && <Text onPress={link => this.handleWebsitePress} note>{website}</Text>}
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
              <Left>
                {user.data.uid !== owner && (
                  <S.Button
                    block
                    onPress={() => this.handleApplyPress(key, applications, members)}
                  >
                    <Text>Apply to Org</Text>
                  </S.Button>
                )}
                {user.data.uid === owner && (
                  <>
                    <S.Button
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
              </Left>
            </CardItem>
          </Card>

        </Content>
      </Container>
    )
  }
}

export default view(OrgScreen)
