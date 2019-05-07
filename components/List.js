import React from 'react'
import { FlatList } from 'react-native'
import {
  Container,
  Content,
  Icon,
  Left,
  ListItem,
  Right,
  Text
} from 'native-base'

export const List = ({
  data,
  navigation,
  loading = false
}) => (
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
