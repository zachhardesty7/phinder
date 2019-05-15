import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import {
  Button,
  Container,
  Content,
  Icon,
  Spinner,
  Text
} from 'native-base'
import { db } from '../src/integrations'

import { List } from '../components'

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
      <Container>
        <Content>
          { loading ? (
            <S.View>
              <S.Spinner color='blue' />
              <S.Text>loading orgs...</S.Text>
            </S.View>
          ) : (
            <List data={data} navigation={navigation} />
          )}
        </Content>
      </Container>
    )
  }
}

export default OrgsScreen
