import React from 'react'
import { FlatList } from 'react-native'
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

import { List } from '../components'

class OrgsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Orgs',
    headerRight: (
      <Button transparent onPress={() => navigation.push('OrgCreate')}>
        <Icon ios='ios-add' android='md-add' />
      </Button>
    )
  })

  state = {
    loading: true,
    data: null
  }

  componentDidMount = async() => {
    const querySnapshot = await db.collection('orgs').get()
    const data = []
    querySnapshot.forEach(doc => data.push({ ...doc.data(), key: doc.id }))
    this.setState({ data, loading: false })
  }

  render() {
    const { navigation } = this.props
    const { data, loading } = this.state

    return (
      loading ? (
        <Container>
          <Content>
            <Text>loading orgs...</Text>
            <Spinner />
          </Content>
        </Container>
      ) : (
        <List data={data} navigation={navigation} />
      )
    )
  }
}

export default OrgsScreen
