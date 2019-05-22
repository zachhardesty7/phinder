import React from 'react'
import { FlatList } from 'react-native'
import {
  Container,
  Content,
  Left,
  ListItem,
  Text
} from 'native-base'
import { db } from '../utils/firebase'

import * as S from '../components/styled'

// @TODO reload applicant data after change
export class MembersScreen extends React.Component {
  state = { users: {} }

  componentDidMount = async() => {
    const { navigation } = this.props
    const members = navigation.getParam('members', [])

    const users = await Promise.all(members.map(uid => (
      db.collection('users').doc(uid).get()
    )))

    const usersData = users.map(user => user.data())
    const usersKeyed = usersData.map(user => ({ ...user, key: user.uid }))

    this.setState({ users: usersKeyed })
  }

  render() {
    const { users } = this.state

    return (
      <Container>
        <Content>
          {users ? (
            <FlatList
              data={users}
              renderItem={({ item }) => (
                <ListItem activeOpacity={0.5}>
                  <Left>
                    <Text>{item.displayName}</Text>
                  </Left>
                </ListItem>
              )}
            />
          ) : (
            <S.View.Center>
              <S.Text>no members...</S.Text>
            </S.View.Center>
          )}
        </Content>
      </Container>
    )
  }
}
