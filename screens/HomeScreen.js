import React from 'react'
import {
  Container,
  Content,
  H1,
  Text
} from 'native-base'
import { Calendar } from 'react-native-calendars'
import { view } from 'react-easy-state'
import styled from 'styled-components/native'

const S = {}

S.H1 = styled(H1)`
  text-align: center;
  padding: 30px 0;
`

S.Text = styled(Text)`
  text-align: center;
  padding: 5px;
`

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Phinder'
  };

  state = {
    selected: null
  }

  render() {
    const { selected } = this.state

    return (
      <Container>
        <S.H1>Upcoming Events</S.H1>
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
            <S.Text>No upcoming events, check back later</S.Text>
          )}
        </Content>
      </Container>
    )
  }
}

export default view(HomeScreen)
