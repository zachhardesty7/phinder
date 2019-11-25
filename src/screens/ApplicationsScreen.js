import React from 'react'
import { FlatList } from 'react-native'
import {
	Container,
	Content,
	Icon,
	Left,
	ListItem,
	Text,
	Toast,
} from 'native-base'
import { db } from '../utils/firebase'

import * as S from '../components/styled'

const iconStyle = { fontSize: 50, paddingLeft: 10, paddingRight: 10 }

// @TODO doesn't show applicants, button broken
// TODO: upgrade to hooks
export class ApplicationsScreen extends React.Component {
	// eslint-disable-next-line react/state-in-constructor
	state = { loading: true, users: {} }

	componentDidMount = async() => {
		const { navigation } = this.props
		const applications = navigation.getParam('applications', null)
		const members = navigation.getParam('members', null)

		const users = await Promise.all(applications.map((uid) => (
			db.collection('users').doc(uid).get()
		)))

		const usersData = users.map((user) => user.data())
		const usersKeyed = usersData.map((user) => ({ ...user, key: user.uid }))

		this.setState({ users: usersKeyed, members, loading: false })
	}

	toUIDs = (users) => users.map((user) => user.uid)

	removeUID = (users, uid) => users.filter((user) => user.uid !== uid)

	handleAcceptPress = async(uid) => {
		const { users, members } = this.state
		const usersUpdated = this.removeUID(users, uid)
		const applicationsUpdated = this.toUIDs(usersUpdated)
		const membersUpdated = [...new Set([...members, uid])]
		const { navigation } = this.props
		const key = navigation.getParam('key', null)

		this.setState({
			users: usersUpdated,
			members: membersUpdated,
		})

		await db
			.collection('orgs')
			.doc(key)
			.update({
				applications: applicationsUpdated,
				members: membersUpdated,
			})

		Toast.show({
			type: 'success',
			duration: 3000,
			text: 'Applicant Accepted!',
			buttonText: 'Okay',
		})
	}

	handleDeclinePress = async(uid) => {
		const { users } = this.state
		const usersUpdated = this.removeUID(users, uid)
		const applicationsUpdated = this.toUIDs(usersUpdated)
		const { navigation } = this.props
		const key = navigation.getParam('key', null)

		this.setState({
			users: usersUpdated,
		})

		await db
			.collection('orgs')
			.doc(key)
			.update({
				applications: applicationsUpdated,
			})

		Toast.show({
			type: 'warning',
			duration: 3000,
			text: 'Applicant Declined!',
			buttonText: 'Okay',
		})
	}

	render() {
		const { users, loading } = this.state

		return (
			<Container>
				<Content>
					{loading && (
						<S.View.Center>
							<S.Spinner color='blue' />
							<S.Text>loading applicants...</S.Text>
						</S.View.Center>
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
										<Icon style={iconStyle} name='checkmark' onPress={() => this.handleAcceptPress(item.uid)} />
										<Icon style={iconStyle} name='close' onPress={() => this.handleDeclinePress(item.uid)} />
									</S.Right>
								</ListItem>
							)}
						/>
					) : (
						<S.View.Center>
							<S.Text>no applicants...</S.Text>
						</S.View.Center>
					))}
				</Content>
			</Container>
		)
	}
}
