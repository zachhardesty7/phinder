import React from 'react'
import {
  Container,
  Content,
  List,
  Text
} from 'native-base'
import { Agenda, Calendar, CalendarList } from 'react-native-calendars'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    selected: null
  }

  render() {
    const { selected } = this.state

    return (
      <Container>
        <Text>Phinder</Text>
        <Calendar
          markedDates={selected}
          onDayPress={(day) => {
            this.setState({
              selected: {
                [day.dateString]: {
                  selected: true
                }
              }
            })
          }}
        />
        <Content>
          {selected && (
            <Text>No upcoming events, check back later</Text>
          )}
        </Content>
      </Container>
    )
  }
}
