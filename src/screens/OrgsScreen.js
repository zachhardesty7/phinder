import React from 'react'
import { Container, Content } from 'native-base'
import { db } from '../utils/firebase'

import { List } from '../components'

import * as S from '../components/styled'

export class OrgsScreen extends React.Component {
  state = {
    loading: true,
    data: null
  }

  load = async() => {
    const querySnapshot = await db.collection('orgs').get()
    const data = []
    querySnapshot.forEach(doc => data.push({ ...doc.data(), key: doc.id }))
    this.setState({ data, loading: false })
  }

  handleReloadOrgs = () => {
    this.setState({ loading: true })
    this.load()
  }

  componentDidMount = () => {
    const { navigation } = this.props

    navigation.setParams({ reloadOrgs: this.handleReloadOrgs })
    this.load()
  }

  render() {
    const { navigation } = this.props
    const { data, loading } = this.state

    return (
      <Container>
        <Content>
          { loading ? (
            <S.View.Center>
              <S.Spinner color='blue' />
              <S.Text>loading orgs...</S.Text>
            </S.View.Center>
          ) : (
            <List data={data} navigation={navigation} reloadOrgs={this.handleReloadOrgs} />
          )}
        </Content>
      </Container>
    )
  }
}
