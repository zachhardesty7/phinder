import React from 'react'
import { Container, Content } from 'native-base'
import { Calendar } from 'react-native-calendars'

import * as S from '../components/styled'

export const HomeScreen = () => {
	const [selected, setSelected] = React.useState(null)
	return (
		<Container>
			<S.H1>Upcoming Events</S.H1>
			<Calendar
				markedDates={selected}
				onDayPress={(day) => {
					setSelected({
						[day.dateString]: {
							selected: true,
						},
					})
				}}
			/>
			<Content>
				{selected && (
					<S.Text padding='5px'>No upcoming events, check back later</S.Text>
				)}
			</Content>
		</Container>
	)
}
