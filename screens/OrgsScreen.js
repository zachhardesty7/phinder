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
  Text,
  Thumbnail
} from 'native-base'
import { db } from '../src/integrations'

export default class OrgsScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Orgs'
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
        <Container>
          <Content>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ListItem
                  button
                  activeOpacity={0.5}
                  onPress={() => navigation.push('Org', item)}
                >
                  <Left>
                    <Text>{item.name}</Text>
                  </Left>
                  <Right>
                    <Icon name='arrow-forward' />
                  </Right>
                </ListItem>
              )}
            />
          </Content>
        </Container>
      )
    )
  }
}
