import React from 'react'
import { FlatList } from 'react-native'
import {
  Icon,
  Left,
  ListItem,
  Right,
  Text
} from 'native-base'

export const List = ({
  data,
  navigation,
  reloadOrgs
}) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <ListItem
        button
        activeOpacity={0.5}
        onPress={() => navigation.push('Org', { item, reloadOrgs })}
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
)
