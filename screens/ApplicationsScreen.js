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
  Text,
  Toast
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
class ApplicationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Applications',
    headerLeft: (
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon ios='ios-close' android='md-close' />
      </Button>
    )
  })

  state = { loading: true }

  componentDidMount = async() => {
    const { navigation } = this.props
    const applications = navigation.getParam('applications', null)
    const members = navigation.getParam('members', null)

    const users = await Promise.all(applications.map(uid => (
      db.collection('users').doc(uid).get()
    )))

    const usersData = users.map(user => user.data())
    const usersKeyed = usersData.map(user => ({ ...user, key: user.uid }))

    this.setState({ users: usersKeyed, members, loading: false })
  }

  toUIDs = users => users.map(user => user.uid)

  removeUID = (users, uid) => users.filter(user => user.uid !== uid)

  handleAcceptPress = async(uid) => {
    const { users, members } = this.state
    const usersUpdated = this.removeUID(users, uid)
    const applicationsUpdated = this.toUIDs(usersUpdated)
    const membersUpdated = [...new Set([...members, uid])]
    const { navigation } = this.props
    const key = navigation.getParam('key', null)

    this.setState({
      users: usersUpdated,
      members: membersUpdated
    })

    await db
      .collection('orgs')
      .doc(key)
      .update({
        applications: applicationsUpdated,
        members: membersUpdated
      })

    Toast.show({
      type: 'success',
      duration: 3000,
      text: 'Applicant Accepted!',
      buttonText: 'Okay'
    })
  }

  handleDeclinePress = async(uid) => {
    const { users } = this.state
    const usersUpdated = this.removeUID(users, uid)
    const applicationsUpdated = this.toUIDs(usersUpdated)
    const { navigation } = this.props
    const key = navigation.getParam('key', null)

    this.setState({
      users: usersUpdated
    })

    await db
      .collection('orgs')
      .doc(key)
      .update({
        applications: applicationsUpdated
      })

    Toast.show({
      type: 'warning',
      duration: 3000,
      text: 'Applicant Declined!',
      buttonText: 'Okay'
    })
  }

  render() {
    const { users, loading } = this.state

    return (
      <Container>
        <Content>
          {loading && (
            <S.View>
              <S.Spinner color='blue' />
              <S.Text>loading applicants...</S.Text>
            </S.View>
          )}
          {users && (users.length ? (
            <FlatList
              data={users}
              renderItem={({ item }) => (
                <ListItem activeOpacity={0.5}>
                  <Left>
                    <Text>{item.displayName}</Text>
                  </Left>
                  <S.Right>
                    <Icon style={{ fontSize: 50, paddingLeft: 10, paddingRight: 10 }} name='checkmark' onPress={() => this.handleAcceptPress(item.uid)} />
                    <Icon style={{ fontSize: 50, paddingLeft: 10, paddingRight: 10 }} name='close' onPress={() => this.handleDeclinePress(item.uid)} />
                  </S.Right>
                </ListItem>
              )}
            />
          ) : (
            <S.View>
              <S.Text>no applicants...</S.Text>
            </S.View>
          ))}
        </Content>
      </Container>
    )
  }
}

export default ApplicationsScreen
