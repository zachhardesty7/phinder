import React from 'react'
import { AsyncStorage } from 'react-native'
import { Container, Content } from 'native-base'

import { view } from 'react-easy-state'
import { loginWithFacebook, subscribeAuthChange } from '../utils/auth'
import { db } from '../utils/firebase'
import { user } from '../utils/userStore'

import * as S from '../components/styled'

export const AuthScreen = view(({ navigation }) => {
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		// check for uid in storage then fetch user or force login
		const bootstrapAsync = async() => {
			const uid = await AsyncStorage.getItem('uid')

			if (uid) {
				const data = await db.collection('users').doc(uid).get()
				user.data = data.data() // update global store
				navigation.navigate('Home')
			} else {
				setLoading(false)
			}
		}

		bootstrapAsync()

		subscribeAuthChange(async(data) => {
			if (data && data.providerData && data.providerData[0]) {
				await AsyncStorage.setItem('uid', data.providerData[0].uid)
				const userData = await db.collection('users').doc(data.providerData[0].uid).get()
				user.data = userData.data()
				navigation.navigate('Home')
			}
		})
	}, [navigation])

	const handleLoginPress = () => {
		setLoading(true)
		loginWithFacebook()
	}

	return loading ? (
		<S.View.Center>
			<S.Spinner color='blue' />
			<S.Text>attempting login...</S.Text>
		</S.View.Center>
	) : (
		<Container>
			<Content>
				<S.Button onPress={handleLoginPress} title='Login with Facebook' marginRight='15px'>
					<S.Text>Login with Facebook</S.Text>
				</S.Button>
			</Content>
		</Container>
	)
})
