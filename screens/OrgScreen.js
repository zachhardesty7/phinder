// import { Font } from 'expo'
// import { Ionicons } from '@expo/vector-icons'
// import styled from 'styled-components/native'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Content,
  Icon,
  Text,
  Toast
} from 'native-base'

import { view } from 'react-easy-state'
import { db } from '../src/integrations'
import { user } from '../src/userStore'

export default view(class Org extends Component {
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
    const name = navigation.getParam('name', 'Organization')

    return (
      <Container>
        <Content>
          <Text>{name}</Text>
          <Button
            block
            onPress={this.handleApply}
          >
            <Text>Apply to Org</Text>
          </Button>
        </Content>
      </Container>
    )
  }
})
