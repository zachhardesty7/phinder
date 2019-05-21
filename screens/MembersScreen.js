import React from 'react'
import styled from 'styled-components/native'
import { FlatList, View } from 'react-native'
import {
  Button,
  Container,
  Content,
  Icon,
  Left,
  ListItem,
  Right,
  Spinner,
  Text
} from 'native-base'
import { db } from '../src/integrations'

// import { List } from '../components'

const S = {}

S.View = styled(View)`
  display: flex;
  flex: 1;
  align-self: center;
  justify-content: center;
`

S.Spinner = styled(Spinner)`
  display: flex;
  align-self: center;
  margin-top: 20px;
`

S.Text = styled(Text)`
  text-align: center;
`

S.Right = styled(Right)`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`

// @TODO reload applicant data after change
class MembersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Members',
    headerLeft: (
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon ios='ios-close' android='md-close' />
      </Button>
    )
  })

  state = {}

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
            <S.View>
              <S.Text>no members...</S.Text>
            </S.View>
          )}
        </Content>
      </Container>
    )
  }
}

export default MembersScreen
